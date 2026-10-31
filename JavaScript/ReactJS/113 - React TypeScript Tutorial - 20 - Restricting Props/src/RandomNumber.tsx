type RandomNumberType = { value: number };

type PositiveNumber = RandomNumberType & {
  isPositive: boolean;
  isNegative?: never;
  isZero?: never;
};

type NegativeNumber = RandomNumberType & {
  isNegative: boolean;
  isPositive?: never;
  isZero?: never;
};

type Zero = RandomNumberType & {
  isZero: boolean;
  isPositive?: never;
  isNegative?: never;
};

type RandomNumberProps = PositiveNumber | NegativeNumber | Zero;

export default function RandomNumber({ value, isPositive, isNegative, isZero }: RandomNumberProps) {
  return (
    <div>
      {value} {isPositive && "positif"} {isNegative && "negatif"} {isZero && "nol"}
    </div>
  );
}
