export interface playerJoins {
  type: string;

  feetPos: number[];
  feetDirection: number[];

  headPos: number[];
  headRot: number[];

  level: number;
  id: string;
}

export default playerJoins;
