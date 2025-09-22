"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, Users, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const EBTutorCard = ({ course }: { course: number }) => {
  return (
    <Card key={course} className="hover:shadow-lg transition-shadow border-0 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">Toán học cơ bản {course}</CardTitle>
          <Badge variant="secondary">Phổ biến</Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>25 học sinh đã đăng ký</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>2 giờ/buổi</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-primary">200,000 - 1,000,000 VNĐ</span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                <Info className="h-3 w-3" />
                <span>Học phí dựa trên số buổi</span>
              </div>
            </div>
            <Button size="sm">Đăng ký</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EBTutorCard;
