import { TooltipProvider } from "@/components/ui/tooltip";

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-full flex flex-col">
      <TooltipProvider>{children}</TooltipProvider>
    </div>
  );
}