/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  BarChart,
  Bell,
  BookOpen,
  Calendar,
  ChevronDown,
  GraduationCap,
  Home,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  User,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAuth0 } from "@auth0/auth0-react";

export default function EnhancedAdminDashboard() {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  const stats = {
    students: 1234,
    teachers: 56,
    queriesIssued: 789,
    queriesSolved: 567,
    classesScheduled: 98,
    averageAttendance: 92,
  };

  const recentActivities = [
    {
      id: 1,
      student: "Alice Johnson",
      action: "Submitted assignment",
      course: "Mathematics",
      time: "2 hours ago",
    },
    {
      id: 2,
      student: "Bob Smith",
      action: "Joined live class",
      course: "Physics",
      time: "3 hours ago",
    },
    {
      id: 3,
      student: "Charlie Brown",
      action: "Completed quiz",
      course: "Chemistry",
      time: "5 hours ago",
    },
    {
      id: 4,
      student: "Diana Ross",
      action: "Asked a question",
      course: "Biology",
      time: "6 hours ago",
    },
    {
      id: 5,
      student: "Ethan Hunt",
      action: "Watched recorded lecture",
      course: "Computer Science",
      time: "1 day ago",
    },
  ];

  const topTeachers = [
    {
      name: "Dr. Emily White",
      subject: "Mathematics",
      rating: 4.9,
      students: 156,
    },
    {
      name: "Prof. Michael Green",
      subject: "Physics",
      rating: 4.8,
      students: 132,
    },
    {
      name: "Ms. Sarah Black",
      subject: "English Literature",
      rating: 4.7,
      students: 128,
    },
    {
      name: "Mr. David Blue",
      subject: "Computer Science",
      rating: 4.6,
      students: 118,
    },
  ];

  const graphData = [
    { name: "Jan", students: 400, teachers: 24 },
    { name: "Feb", students: 500, teachers: 28 },
    { name: "Mar", students: 600, teachers: 32 },
    { name: "Apr", students: 800, teachers: 36 },
    { name: "May", students: 1000, teachers: 40 },
    { name: "Jun", students: 1200, teachers: 48 },
  ];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          <span className="text-2xl font-semibold text-gray-800 dark:text-white">
            EduAdmin
          </span>
        </div>
        <nav className="mt-6">
          {[
            { name: "Dashboard", icon: LayoutDashboard },
            { name: "Students", icon: Users },
            { name: "Teachers", icon: GraduationCap },
            { name: "Courses", icon: BookOpen },
            { name: "Schedule", icon: Calendar },
            { name: "Messages", icon: MessageSquare },
            { name: "Settings", icon: Settings },
          ].map((item) => (
            <a
              key={item.name}
              href="#"
              className={`flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                activeNav === item.name.toLowerCase()
                  ? "bg-gray-100 dark:bg-gray-700"
                  : ""
              }`}
              onClick={() => setActiveNav(item.name.toLowerCase())}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Button variant="outline" size="icon" className="mr-4">
              <Bell className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Dashboard
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button className="w-full">
              {
                isAuthenticated? (
                  <Button onClick={logout} variant="ghost" className="hover:bg-[rgb(15 23 42 / 1)] hover:text-white">
                    Logout
                  </Button>
                ) : (
                  <Button onClick={loginWithRedirect} variant={'ghost'} className="hover:bg-[rgb(15 23 42 / 1)] hover:text-white">Login</Button>
                )
              }
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center">
                  <Avatar className="w-8 h-8 mr-2">
                    <AvatarImage src="/placeholder-avatar.jpg" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <span>Admin User</span>
                  <ChevronDown className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Students
                  </CardTitle>
                  {/* <Users className="h-4 w-4 text-muted-foreground" /> */}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.students}</div>
                  <p className="text-xs text-muted-foreground">
                    +20% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Teachers
                  </CardTitle>
                  {/* <GraduationCap className="h-4 w-4 text-muted-foreground" /> */}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.teachers}</div>
                  <p className="text-xs text-muted-foreground">
                    +2 new this week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Queries Solved
                  </CardTitle>
                  {/* <MessageSquare className="h-4 w-4 text-muted-foreground" /> */}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.queriesSolved}/{stats.queriesIssued}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    71% resolution rate
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Growth Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={graphData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="students"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="teachers"
                        stroke="#82ca9d"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Student Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Action</TableHead>
                        <TableHead>Course</TableHead>
                        <TableHead>Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentActivities.map((activity) => (
                        <TableRow key={activity.id}>
                          <TableCell className="font-medium">
                            {activity.student}
                          </TableCell>
                          <TableCell>{activity.action}</TableCell>
                          <TableCell>{activity.course}</TableCell>
                          <TableCell>{activity.time}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Teachers</CardTitle>
                <CardDescription>
                  Based on student ratings and engagement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Students</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topTeachers.map((teacher) => (
                      <TableRow key={teacher.name}>
                        <TableCell className="font-medium">
                          {teacher.name}
                        </TableCell>
                        <TableCell>{teacher.subject}</TableCell>
                        <TableCell>{teacher.rating}</TableCell>
                        <TableCell>{teacher.students}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
