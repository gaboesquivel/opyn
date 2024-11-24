import { MarketAbis, MarketAddresses } from '../types/index'
import { ControllerAbi } from './Controller'
import { FactoryAbi } from './Factory'
import { FeederAbi } from './Feeder'
import { RedemptionAbi } from './Redemption'
import { ShutdownAbi } from './Shutdown'

export const opynAbis: MarketAbis = {
  Controller: ControllerAbi,
  Factory: FactoryAbi,
  Feeder: FeederAbi,
  Redemption: RedemptionAbi,
  Shutdown: ShutdownAbi,
}

export { ControllerAbi, FactoryAbi, FeederAbi, RedemptionAbi, ShutdownAbi }
