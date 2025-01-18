import { EggIcon } from "@/components/allergies/EggIcon";
import { MilkIcon } from "@/components/allergies/MilkIcon";
import { WheatIcon } from "@/components/allergies/WheatIcon";
import { SobaIcon } from "@/components/allergies/SobaIcon";
import { PeanutsIcon } from "@/components/allergies/PeanutsIcon";
import { ShrimpIcon } from "@/components/allergies/ShrimpIcon";
import { CrabIcon } from "@/components/allergies/CrabIcon";
import { AbaloneIcon } from "@/components/allergies/AbaloneIcon";
import { SquidIcon } from "@/components/allergies/SquidIcon";
import { SalmonRoeIcon } from "@/components/allergies/SalmonRoeIcon";
import { OrangeIcon } from "@/components/allergies/OrangeIcon";
import { KiwiIcon } from "@/components/allergies/KiwiIcon";
import { BeefIcon } from "@/components/allergies/BeefIcon";
import { WalnutIcon } from "@/components/allergies/WalnutIcon";
import { SakeIcon } from "@/components/allergies/SakeIcon";
import { SabaIcon } from "@/components/allergies/SabaIcon";
import { SoybeanIcon } from "@/components/allergies/SoybeanIcon";
import { ChickenIcon } from "@/components/allergies/ChickenIcon";
import { BananaIcon } from "@/components/allergies/BananaIcon";
import { PorkIcon } from "@/components/allergies/PorkIcon";
import { MatsutakeIcon } from "@/components/allergies/MatsutakeIcon";
import { PeachIcon } from "@/components/allergies/PeachIcon";
import { YamIcon } from "@/components/allergies/YamIcon";
import { AppleIcon } from "@/components/allergies/AppleIcon";
import { GelatinIcon } from "@/components/allergies/GelatinIcon";
import { SesameIcon } from "@/components/allergies/SesameIcon";
import { CashewIcon } from "@/components/allergies/CashewIcon";

export const allergyComponents: { [key: string]: React.FC<{ size: number }> } =
  {
    卵: EggIcon,
    乳: MilkIcon,
    小麦: WheatIcon,
    そば: SobaIcon,
    落花生: PeanutsIcon,
    えび: ShrimpIcon,
    かに: CrabIcon,
    あわび: AbaloneIcon,
    いか: SquidIcon,
    いくら: SalmonRoeIcon,
    オレンジ: OrangeIcon,
    キウイ: KiwiIcon,
    牛肉: BeefIcon,
    くるみ: WalnutIcon,
    さけ: SakeIcon,
    さば: SabaIcon,
    大豆: SoybeanIcon,
    鶏肉: ChickenIcon,
    バナナ: BananaIcon,
    豚肉: PorkIcon,
    まつたけ: MatsutakeIcon,
    もも: PeachIcon,
    やまいも: YamIcon,
    りんご: AppleIcon,
    ゼラチン: GelatinIcon,
    ごま: SesameIcon,
    カシューナッツ: CashewIcon,
  };

const sizeValues = {
  small: 20,
  large: 24,
};

export interface AllergyIconProps {
  allergyType: keyof typeof allergyComponents;
  sizeCategory: keyof typeof sizeValues;
}

export function AllergyIcon({ allergyType, sizeCategory }: AllergyIconProps) {
  const IconComponent = allergyComponents[allergyType];
  return IconComponent ? (
    <IconComponent size={sizeValues[sizeCategory]} />
  ) : null;
}
