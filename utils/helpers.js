export const deDupeAndFlattenArr = (arr, key) => {
	return arr.filter(
        (set => launch =>
          !set.has(launch.rocket.agencies[0][key]) &&
          set.add(launch.rocket.agencies[0][key]))(new Set())
      )
      .map(launch => launch.rocket.agencies.map(agency => agency[key]))
      .reduce((prev, curr) => prev.concat(curr[0]), []);
}