import React from "react";
import {
  EBMotionCard,
  MotionContainer,
  MotionItem,
  scaleVariants,
  fadeInVariants,
} from "../src/components/motion/index";

// Example usage component
export const MotionCardExample: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold mb-6">Motion Card Examples</h2>

      {/* Basic Card with default animation */}
      <EBMotionCard>
        <h3 className="text-lg font-semibold mb-2">Default Card Animation</h3>
        <p className="text-muted-foreground">
          This card uses the default animation from motion.constant.ts
        </p>
      </EBMotionCard>

      {/* Card with custom animation */}
      <EBMotionCard variants={scaleVariants} className="bg-primary/5 border-primary/20">
        <h3 className="text-lg font-semibold mb-2">Custom Scale Animation</h3>
        <p className="text-muted-foreground">This card uses custom scale animation variants</p>
      </EBMotionCard>

      {/* Clickable Card */}
      <EBMotionCard onClick={() => alert("Card clicked!")} className="hover:border-primary/50">
        <h3 className="text-lg font-semibold mb-2">Clickable Card</h3>
        <p className="text-muted-foreground">This card is clickable and has tap animation</p>
      </EBMotionCard>

      {/* Container with staggered items */}
      <MotionContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <MotionItem key={item}>
            <EBMotionCard variants={fadeInVariants}>
              <h4 className="font-medium">Card {item}</h4>
              <p className="text-sm text-muted-foreground">Staggered animation item</p>
            </EBMotionCard>
          </MotionItem>
        ))}
      </MotionContainer>
    </div>
  );
};

export default MotionCardExample;
