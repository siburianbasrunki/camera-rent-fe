import cannon from "../assets/cannon.png";
import nikon from "../assets/nikon.svg";
import sony from "../assets/sony.png";
import EosCanon from "../assets/EOS 3000D Kit (EF S18-55 III).png";
import Sony600k from "../assets/sonyisoa6000k.jpg";
import NikonD3500 from "../assets/NikonD3500.jpg";
export const BrandData = [
  {
    id: 1,
    name: "Canon",
    image: cannon,
  },
  {
    id: 2,
    name: "Nikon",
    image: nikon,
  },
  {
    id: 3,
    name: "Sony",
    image: sony,
  },
];

export const CameraData = [
  {
    id: 1,
    name: "Canon EOS 3000D",
    image: EosCanon,
    price: 80000,
    ciri_ciri: [
      { ciri: "Sensor APS-C 18 Megapiksel" },
      { ciri: "Lensa Kit EF-S 18-55mm f/3.5-5.6 III" },
      { ciri: "Konektivitas Wi-Fi" },
    ],
  },
  {
    id: 2,
    name: "Sony A6000",
    image: Sony600k,
    price: 100000,
    ciri_ciri: [
      { ciri: "Sensor APS-C 24.3 Megapiksel" },
      { ciri: "Fast Hybrid Autofocus (179 titik deteksi fase)" },
      { ciri: "Desain Ringkas Mirrorless + Layar LCD Tilting" },
    ],
  },
  {
    id: 3,
    name: "Nikon D3500",
    image: NikonD3500,
    price: 110000,
    ciri_ciri: [
      { ciri: "Sensor APS-C 24.2 Megapiksel tanpa low-pass filter" },
      { ciri: "Lensa dengan VR (Vibration Reduction)" },
      { ciri: "Baterai Tahan Lama (hingga 1550 jepretan per charge)" },
    ],
  },
];
