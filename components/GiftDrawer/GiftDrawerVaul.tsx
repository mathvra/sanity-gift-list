import { Drawer } from "vaul";
import { Button } from "../ui/button";
import {
  ArrowSquareOut,
  CircleNotch,
  Eye,
  PencilSimpleLine,
} from "@phosphor-icons/react";
import Link from "next/link";
import { GiftForm } from "../GiftForm/GiftForm";
import { useState } from "react";

interface GiftDrawerProps {
  isAssigned: boolean;
  name: string;
  description: string;
  url: string;
  id: string;
  refetch: any;
}

export default function GiftDrawer({
  isAssigned,
  name,
  description,
  url,
  refetch,
  id,
}: GiftDrawerProps) {
  const [submitLoading, setSubmitLoading] = useState(false);

  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        {isAssigned ? (
          <Button variant={"secondary"} className="w-full">
            <Eye weight="bold" />
            Detalhes
          </Button>
        ) : (
          <Button className="w-full">
            <PencilSimpleLine weight="bold" />
            Assinar
          </Button>
        )}
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-lg fixed bottom-0 left-0 right-0 p-4 gap-4 after:!content-none">
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300" />
          <Drawer.Title>{name}</Drawer.Title>
          <Drawer.Description>{description}</Drawer.Description>
          {!isAssigned && (
            <Button asChild>
              <Link href={url} target="_blank">
                <ArrowSquareOut weight="bold" />
                Ver na loja
              </Link>
            </Button>
          )}
          <div>
            {isAssigned ? (
              <div>
                <span className="text-secondary-0 font-bold">
                  Esse presente já foi assinado!
                </span>
                <p className="text-secondary-0 text-sm">
                  Não se preocupe, você pode escolher outro presente que esteja
                  disponível na lista!
                </p>
              </div>
            ) : (
              <div>
                <span className="text-primary-0 font-bold">
                  Assinar presente:
                </span>
                <p className="text-sm">
                  Preencha suas informações para garantir a sua assinatura do
                  presente
                </p>
              </div>
            )}
          </div>
          {!isAssigned && (
            <GiftForm
              isAssigned={isAssigned}
              id={id}
              refetch={refetch}
              setSubmitLoading={setSubmitLoading}
            />
          )}
          <div className="flex gap-4">
            <Drawer.Close asChild>
              {isAssigned ? (
                <Button variant="secondaryWhite" className="w-1/2">
                  Voltar
                </Button>
              ) : (
                <Button variant="defaultWhite" className="w-1/2">
                  Cancelar
                </Button>
              )}
            </Drawer.Close>
            {isAssigned ? (
              <Button variant="secondary" className="w-1/2" asChild>
                <Link href={url} target="_blank">
                  <ArrowSquareOut weight="bold" />
                  Ver na loja
                </Link>
              </Button>
            ) : submitLoading ? (
              <Button className="w-1/2" type="submit" form="gift-form">
                <CircleNotch weight="bold" className="animate-spin" />
                Carregando
              </Button>
            ) : (
              <Button
                variant="defaultStrong"
                className="w-1/2"
                type="submit"
                form="gift-form"
              >
                <PencilSimpleLine weight="bold" />
                Assinar
              </Button>
            )}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}