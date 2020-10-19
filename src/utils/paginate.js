import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  if (pageSize === 0) return items;

  const startIndex = (pageNumber - 1) * pageSize;

  return _(items).slice(startIndex).take(pageSize).value();
}
