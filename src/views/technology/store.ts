import { useHero } from '@store'
import data from '@json/data.json'

type ArgsType = typeof data.technology

export const useHeroTechnology = useHero<ArgsType>({
  storeId: 'technologyStore',
  listItems: data.technology,
})
