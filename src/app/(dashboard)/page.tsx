import { format, isSameDay, subDays } from "date-fns";

import { BarfChart } from "@/app/(dashboard)/barf-chart";
import { QuickLogForm } from "@/app/(dashboard)/form";
import { Stat } from "@/components/stat";
import { WidgetRoot, WidgetTitle } from "@/components/widget";
import { getEmesisEvents } from "@/lib/emesis-events";

const today = new Date();

const formatDay = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};

const getDays = (count: number) => {
  return [
    formatDay(today),
    ...Array.from({ length: count - 1 }, (_, index) =>
      formatDay(subDays(today, index + 1)),
    ),
  ];
};

export default async function RootPage() {
  const entries = await getEmesisEvents();

  if (!entries?.length) {
    return null;
  }

  const oneWeekData = getDays(7)
    .map((value) => {
      return entries.filter((entry) =>
        isSameDay(new Date(value), new Date(entry.created_at)),
      );
    })
    .map((entries) => entries.length)
    .reverse();

  return (
    <div className="grid gap-4">
      <QuickLogForm />
      <h2 className="font-medium text-2xl">Weekly overview</h2>
      <BarfChart entries={entries} />
      <h2 className="font-medium text-2xl">Stats</h2>
      <div className="grid grid-cols-2 gap-4">
        <Stat
          data={oneWeekData}
          label="Last seven days"
          sentiment="negative"
          value={oneWeekData.reduce<number>(
            (accumulator, currentValue) => accumulator + currentValue,
            0,
          )}
        />
        <WidgetRoot>
          <WidgetTitle>Food cause</WidgetTitle>
          <div className="mt-4 grid gap-4">
            <div className="flex items-center gap-4">
              <div className="w-8 text-right">Wet</div>
              <div
                className="h-8 rounded-sm bg-green-500"
                style={{
                  width: `${
                    (entries.filter((entry) => entry.food?.type.name === "Wet")
                      .length /
                      entries.length) *
                    100
                  }%`,
                }}
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 text-right">Dry</div>
              <div
                className="h-8 rounded-sm bg-orange-500"
                style={{
                  width: `${
                    (entries.filter((entry) => entry.food?.type.name === "Dry")
                      .length /
                      entries.length) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        </WidgetRoot>
      </div>
    </div>
  );
}
