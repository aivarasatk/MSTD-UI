import * as objects from "../api/mstdApi"

export class SortMap {
    key: objects.Sorting;
    value: string | undefined;

    constructor(key: objects.Sorting, value: string) {
        this.key = key;
        this.value = value
    }
}

export const SortOrderMapping: Array<SortMap> = [
    new SortMap(objects.Sorting.LeechersAsc, "Leechers Asc."),
    new SortMap(objects.Sorting.LeecherssDesc, "Leechers Desc."),
    new SortMap(objects.Sorting.SeedersAsc, "Seeders Asc."),
    new SortMap(objects.Sorting.SeedersDesc, "Seeders Desc. (Recommended)"),
    new SortMap(objects.Sorting.SizeAsc, "Size Asc."),
    new SortMap(objects.Sorting.SizeDesc, "Size Desc."),
    new SortMap(objects.Sorting.TimeAsc, "Time Asc."),
    new SortMap(objects.Sorting.TimeDesc, "Time Desc.")
];

export const TorrentCategoryMapping: Array<objects.TorrentCategory> = [
    objects.TorrentCategory.All,
    objects.TorrentCategory.Movies,
    objects.TorrentCategory.TV,
    objects.TorrentCategory.Games,
    objects.TorrentCategory.Music,
    objects.TorrentCategory.Applications,
    objects.TorrentCategory.XXX
]


