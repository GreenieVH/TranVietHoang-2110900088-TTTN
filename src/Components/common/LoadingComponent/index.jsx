import { useSpring, animated } from "@react-spring/web";
import { TailSpin } from "react-loader-spinner";

export default function LoadingComponent() {
  const fadeIn = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.9)" },
    config: { tension: 200, friction: 15 ,mass:1}, 
  });

  return (
    <animated.div
      style={fadeIn}
      className="flex justify-center items-center  h-svh"
    >
      <TailSpin height="100" width="100" color="#4A90E2" />
    </animated.div>
  );
}
