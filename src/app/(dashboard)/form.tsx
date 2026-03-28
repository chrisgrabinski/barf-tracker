import { NotebookPenIcon } from "lucide-react";

import Image from "next/image";
import { EmesisEventFormFields } from "@/app/events/emesis-fields";
import vomitingFaceEmoji from "@/assets/face-vomiting_1f92e.gif";
import nauseatedFaceEmoji from "@/assets/nauseated-face_1f922.gif";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { FormContent, FormRoot } from "@/components/form";
import { createEmesisEvent } from "@/lib/events";

type QuickLogFormProps = {
  defaultValue?: string;
};

const QuickLogForm = ({ defaultValue }: QuickLogFormProps) => {
  return (
    <Card className="grid gap-4">
      <div className="flex items-center gap-1.5 font-semibold text-xl">
        <div className="grid size-10 place-items-center rounded-full bg-muted text-muted-foreground">
          <NotebookPenIcon className="size-5" />
        </div>
        Quick log
      </div>
      <FormRoot action={createEmesisEvent}>
        <FormContent>
          <EmesisEventFormFields food={defaultValue} />
        </FormContent>
        <FormContent>
          <Button className="group" size="lg" type="submit" variant="primary">
            <div className="grid size-[1lh] place-items-center">
              <Image
                alt=""
                className="col-start-1 row-start-1 size-full transition-opacity group-hover:opacity-0"
                height={64}
                src={nauseatedFaceEmoji}
                width={64}
              />
              <Image
                alt=""
                className="col-start-1 row-start-1 size-full opacity-0 transition-opacity group-hover:opacity-100"
                height={64}
                src={vomitingFaceEmoji}
                width={64}
              />
            </div>
            Barf!
          </Button>
        </FormContent>
      </FormRoot>
    </Card>
  );
};

export { QuickLogForm };
