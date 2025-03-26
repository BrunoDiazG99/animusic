import { Button } from "@/components/ui/button";
import { parseXML } from "@/lib/utils";

export function XMLParserComponent() {
  const parse = () => {
    parseXML();
  };

  return (
    <div className="flex flex-wrap mx-auto my-2 w-full max-w-md items-center justify-center gap-2">
      <Button variant="outline" onClick={parse}>
        Parse XML
      </Button>
    </div>
  );
}
