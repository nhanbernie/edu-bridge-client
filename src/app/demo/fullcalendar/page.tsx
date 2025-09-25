import { AvailabilityCalendar } from "@/components/calendar/AvailabilityCalendar";

export default function FullCalendarDemoPage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">FullCalendar Demo</h1>
        <p className="text-gray-600">
          Demo tạo lịch rảnh sử dụng FullCalendar với drag & drop
        </p>
      </div>
      
      <AvailabilityCalendar />
    </div>
  );
}
