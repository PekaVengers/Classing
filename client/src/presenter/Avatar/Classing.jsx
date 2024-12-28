import { Loader } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "@/components/avatar/Experience";
import { UI } from "@/components/avatar/UI";

export default function Classing() {
  return (
    <>
      <Loader />
      <Leva hidden />
      <UI />
      <Canvas shadows camera={{ position: [0, 0, -1], fov: 45 }}>
        <Experience />
      </Canvas>
    </>
  );
}
