import type { MarketAbis } from '../types/index'
import { ControllerAbi } from './market/Controller'
import { FactoryAbi } from './market/Factory'
import { FeederAbi } from './market/Feeder'
import { RedemptionAbi } from './market/Redemption'
import { ShutdownAbi } from './market/Shutdown'

export const opynAbis: MarketAbis = {
  Controller: ControllerAbi,
  Factory: FactoryAbi,
  Feeder: FeederAbi,
  Redemption: RedemptionAbi,
  Shutdown: ShutdownAbi,
}

export { ControllerAbi, FactoryAbi, FeederAbi, RedemptionAbi, ShutdownAbi }

export * from './asset/TestnetToken'
