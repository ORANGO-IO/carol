import { atom } from "jotai";

export const mainComplaintsAtom = atom([]);

export const formAtom = atom({
  complaint: "",
  birthday: "",
  age: "",
  vulnarability: "",
  symptoms: [],
  systolicPressure: "",
  diastolicPressure: "",
  heartRate: "",
  respiratoryRate: "",
  spO2: "",
  temperature: "",
  glasgow: "",
  hgt: "",
  pain: "",
});
