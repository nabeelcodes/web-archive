import { motion } from "motion/react";

import FlexBox from "@/components/UI/FlexBox";

type StepsIndicatorType = {
  totalSteps: number;
  currentStepIndex: number;
};

export const StepsIndicator = ({ totalSteps, currentStepIndex }: StepsIndicatorType) => {
  const stepsArray = new Array(totalSteps).fill(null);

  return (
    <FlexBox className='absolute left-4 top-4 items-center justify-between gap-x-6 p-4'>
      {stepsArray.map((_, index) => (
        <motion.div
          key={index}
          className='h-[8px] w-[8px] rounded-full bg-neutral-900'
          animate={{
            opacity: index === currentStepIndex || index < currentStepIndex ? 1 : 0.2
          }}
          transition={{
            type: "tween",
            duration: 0.3,
            ease: "easeInOut"
          }}
          initial={{ opacity: 0.5 }}
          exit={{ opacity: 0.5 }}
        />
      ))}
    </FlexBox>
  );
};
