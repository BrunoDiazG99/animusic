import MainLayout from "@/components/main-layout";
import { createFileRoute } from "@tanstack/react-router";

const Main = () => {
  return <MainLayout />;
};

export const Route = createFileRoute("/animusic/")({
  component: Main,
});
