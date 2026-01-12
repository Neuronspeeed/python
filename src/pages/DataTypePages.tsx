import { TypePage } from '../components/TypePage'
import { dataTypePageConfigs, type DataTypePageConfig } from '../config/dataTypePageConfigs'
import { stringMethods } from '../data/string'
import { intMethods } from '../data/intMethods'
import { floatMethods } from '../data/float'
import { boolMethods } from '../data/bool'
import { listMethods } from '../data/list'
import { tupleMethods } from '../data/tupleMethods'
import { dictMethods } from '../data/dict'
import { setMethods } from '../data/setMethods'
import type { Method } from '../types'

function createPage(config: DataTypePageConfig, methods: Method[]) {
  return function Page() {
    return (
      <TypePage
        type={config.type}
        badge={config.badge}
        color={config.color}
        description={config.description}
        intro={config.intro}
        tip={config.tip}
        methods={methods}
      />
    )
  }
}

export const StringPage = createPage(dataTypePageConfigs.string, stringMethods)
export const IntPage = createPage(dataTypePageConfigs.int, intMethods)
export const FloatPage = createPage(dataTypePageConfigs.float, floatMethods)
export const BoolPage = createPage(dataTypePageConfigs.bool, boolMethods)
export const ListPage = createPage(dataTypePageConfigs.list, listMethods)
export const TuplePage = createPage(dataTypePageConfigs.tuple, tupleMethods)
export const DictPage = createPage(dataTypePageConfigs.dict, dictMethods)
export const SetPage = createPage(dataTypePageConfigs.set, setMethods)
