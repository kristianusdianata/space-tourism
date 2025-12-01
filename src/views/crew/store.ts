import { useHero } from '@store'
import data from '@json/data.json'

type ArgsType = typeof data.crew

export const useHeroCrew = useHero<ArgsType>({
  storeId: 'crewStore',
  listItems: data.crew,
})
