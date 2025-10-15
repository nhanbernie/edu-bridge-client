<!-- student layout -->
<!-- this is bg and nest layout level 1 -->

min-h-screen bg-gray-50 dark:bg-gray-900 pt-16

<!-- this is size with student layout and nest level -->

max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12

<!-- manage layout -->
<!-- nest level 1 -->

max-w-8xl mx-auto p-6

<!-- nest level 2 -->

<!-- Header title -->
<div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Quản lý khóa học</h1>
          <p className="text-muted-foreground">Quản lý tất cả khóa học của bạn</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            Làm mới
          </Button>
          <Button onClick={handleCreateCourse} className="flex items-center gap-2">
            <PlusCircle className="h-4 w-4" />
            Tạo khóa học mới
          </Button>
        </div>
</div>
