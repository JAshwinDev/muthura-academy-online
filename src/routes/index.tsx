import { createFileRoute } from "@tanstack/react-router";
import { MuthuraSite } from "@/components/muthura/MuthuraSite";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <MuthuraSite />;
}
