import React, { useState } from "react";
import EBButton from "../src/components/common/EBButton";
import { Download, Upload, Save, Trash2, Plus, ArrowRight, Heart, Share } from "lucide-react";

// Example component to demonstrate EBButton usage
const EBButtonExamples: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const handleAsyncAction = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
  };

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold mb-6">EBButton Examples</h2>

      {/* Basic Variants */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Basic Variants</h3>
        <div className="flex flex-wrap gap-4">
          <EBButton variant="default">Default</EBButton>
          <EBButton variant="destructive">Destructive</EBButton>
          <EBButton variant="outline">Outline</EBButton>
          <EBButton variant="secondary">Secondary</EBButton>
          <EBButton variant="ghost">Ghost</EBButton>
          <EBButton variant="link">Link</EBButton>
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Sizes</h3>
        <div className="flex flex-wrap items-center gap-4">
          <EBButton size="sm">Small</EBButton>
          <EBButton size="default">Default</EBButton>
          <EBButton size="lg">Large</EBButton>
          <EBButton size="xl">Extra Large</EBButton>
          <EBButton size="icon" icon={Heart} />
        </div>
      </section>

      {/* Icons - Left Position */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Icons - Left Position</h3>
        <div className="flex flex-wrap gap-4">
          <EBButton icon={Download} iconPosition="left">
            Download
          </EBButton>
          <EBButton icon={Upload} iconPosition="left" variant="outline">
            Upload
          </EBButton>
          <EBButton icon={Save} iconPosition="left" variant="secondary">
            Save
          </EBButton>
          <EBButton icon={Plus} iconPosition="left" size="sm">
            Add New
          </EBButton>
        </div>
      </section>

      {/* Icons - Right Position */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Icons - Right Position</h3>
        <div className="flex flex-wrap gap-4">
          <EBButton icon={ArrowRight} iconPosition="right">
            Continue
          </EBButton>
          <EBButton icon={Share} iconPosition="right" variant="outline">
            Share
          </EBButton>
          <EBButton icon={ArrowRight} iconPosition="right" size="lg">
            Get Started
          </EBButton>
        </div>
      </section>

      {/* Loading States */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Loading States</h3>
        <div className="flex flex-wrap gap-4">
          <EBButton loading>Loading...</EBButton>
          <EBButton loading loadingText="Saving...">
            Save
          </EBButton>
          <EBButton loading={loading} onClick={handleAsyncAction} loadingText="Processing...">
            Async Action
          </EBButton>
          <EBButton loading variant="outline" icon={Upload}>
            Uploading
          </EBButton>
        </div>
      </section>

      {/* Custom Styling */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Custom Styling</h3>
        <div className="flex flex-wrap gap-4">
          <EBButton className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
            Gradient Button
          </EBButton>
          <EBButton
            variant="outline"
            className="border-green-500 text-green-600 hover:bg-green-50"
            icon={Plus}
          >
            Custom Colors
          </EBButton>
          <EBButton className="rounded-full" icon={Heart} iconPosition="left">
            Rounded
          </EBButton>
        </div>
      </section>

      {/* Disabled States */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Disabled States</h3>
        <div className="flex flex-wrap gap-4">
          <EBButton disabled>Disabled</EBButton>
          <EBButton disabled icon={Save} iconPosition="left">
            Disabled with Icon
          </EBButton>
          <EBButton disabled variant="outline">
            Disabled Outline
          </EBButton>
        </div>
      </section>

      {/* Destructive Actions */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Destructive Actions</h3>
        <div className="flex flex-wrap gap-4">
          <EBButton variant="destructive" icon={Trash2} iconPosition="left">
            Delete
          </EBButton>
          <EBButton variant="destructive" loading loadingText="Deleting...">
            Delete Account
          </EBButton>
        </div>
      </section>
    </div>
  );
};

export default EBButtonExamples;
