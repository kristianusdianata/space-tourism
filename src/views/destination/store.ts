import { useHero } from '@store'
import data from '@json/data.json'

type ArgsType = typeof data.destinations

export const useHeroDestination = useHero<ArgsType>({
  storeId: 'destinationStore',
  listItems: data.destinations,
})
