import { BasicAnimeInfo } from "@/lib/types";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

type SearchBarResultsProps = {
  handleAnimeId: (animeId: string | number) => void;
  loading: boolean;
  searchData: BasicAnimeInfo[];
};

function SearchBarResults({
  handleAnimeId,
  loading,
  searchData,
}: SearchBarResultsProps) {
  const handleSearch = (animeId: number | string) => {
    handleAnimeId(animeId);
  };
  const uniqueItems = searchData.filter(
    (item, index, self) =>
      index ===
      self.findIndex((i) => i.series_animedb_id === item.series_animedb_id)
  );

  return (
    <>
      <div className="absolute w-md h-[280px] overflow-auto flex flex-col z-50 ">
        {loading && (
          <Card className="h-[55px] py-0.5 ">
            <div className="space-y-2 m-1">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </Card>
        )}
        {uniqueItems &&
          uniqueItems.length > 0 &&
          uniqueItems.map((data) => (
            <Card
              className="cursor-pointer h-[55px] py-0.5 text-left hover:bg-gray-100"
              key={data.series_animedb_id}
              onClick={() => handleSearch(data.series_animedb_id)}
            >
              <CardHeader className="px-3">
                <CardTitle className="text-sm overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {data.series_title}
                </CardTitle>
                <CardDescription className="text-xs">
                  {data.series_animedb_id}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
      </div>
    </>
  );
}

export default SearchBarResults;
