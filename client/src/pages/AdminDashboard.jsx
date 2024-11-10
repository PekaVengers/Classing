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
      student: "Alice Kumar",
      action: "Submitted assignment",
      course: "Data Structures",
      time: "2 hours ago",
    },
    {
      id: 2,
      student: "Rajesh Singh",
      action: "Joined live class",
      course: "Operating Systems",
      time: "3 hours ago",
    },
    {
      id: 3,
      student: "Priya Sharma",
      action: "Completed quiz",
      course: "Database Management",
      time: "5 hours ago",
    },
    {
      id: 4,
      student: "Vikram Patel",
      action: "Asked a question",
      course: "Computer Networks",
      time: "6 hours ago",
    },
    {
      id: 5,
      student: "Anjali Gupta",
      action: "Watched recorded lecture",
      course: "Machine Learning",
      time: "1 day ago",
    },
  ];

  const topTeachers = [
    {
      name: "Dr. Aarti Menon",
      subject: "Data Structures",
      rating: 4.9,
      students: 156,
    },
    {
      name: "Prof. Suresh Nair",
      subject: "Operating Systems",
      rating: 4.8,
      students: 132,
    },
    {
      name: "Ms. Neha Verma",
      subject: "Computer Networks",
      rating: 4.7,
      students: 128,
    },
    {
      name: "Mr. Anil Kumar",
      subject: "Machine Learning",
      rating: 4.6,
      students: 118,
    },
  ];

  const graphData = [
    {
      name: "Jan",
      attendanceRate: 85,
      averageScore: 72,
      assignmentsCompleted: 40,
    },
    {
      name: "Feb",
      attendanceRate: 88,
      averageScore: 75,
      assignmentsCompleted: 42,
    },
    {
      name: "Mar",
      attendanceRate: 82,
      averageScore: 69,
      assignmentsCompleted: 38,
    },
    {
      name: "Apr",
      attendanceRate: 76,
      averageScore: 65,
      assignmentsCompleted: 35,
    },
    {
      name: "May",
      attendanceRate: 84,
      averageScore: 78,
      assignmentsCompleted: 45,
    },
    {
      name: "Jun",
      attendanceRate: 90,
      averageScore: 82,
      assignmentsCompleted: 48,
    },
    {
      name: "Jul",
      attendanceRate: 93,
      averageScore: 86,
      assignmentsCompleted: 50,
    },
    {
      name: "Aug",
      attendanceRate: 89,
      averageScore: 81,
      assignmentsCompleted: 47,
    },
    {
      name: "Sep",
      attendanceRate: 91,
      averageScore: 88,
      assignmentsCompleted: 52,
    },
    {
      name: "Oct",
      attendanceRate: 95,
      averageScore: 90,
      assignmentsCompleted: 55,
    },
    {
      name: "Nov",
      attendanceRate: 87,
      averageScore: 83,
      assignmentsCompleted: 49,
    },
    {
      name: "Dec",
      attendanceRate: 96,
      averageScore: 92,
      assignmentsCompleted: 57,
    },
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
            { name: "Join Recent Session", icon: Home, url: "/present" },
            { name: "Dashboard", icon: LayoutDashboard },
            { name: "Students", icon: Users },
            { name: "Courses", icon: BookOpen },
            { name: "Schedule", icon: Calendar },
            { name: "Messages", icon: MessageSquare },
            { name: "Settings", icon: Settings },
          ].map((item) => (
            <a
              key={item.name}
              href={item?.url}
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
            {isAuthenticated ? (
              <Button
                onClick={() => logout()}
                variant="ghost"
                className="hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => loginWithRedirect()}
                variant="ghost"
                className="hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Login
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center">
              
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900">
          <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Students
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.students}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Teachers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.teachers}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Classes Scheduled
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {stats.classesScheduled}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4">
                Attendance and Scores Overview
              </h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={graphData}
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="attendanceRate"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="averageScore"
                    stroke="#82ca9d"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-4">Top Teachers</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Teacher</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Students</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topTeachers.map((teacher) => (
                    <TableRow key={teacher.name}>
                      <TableCell>{teacher.name}</TableCell>
                      <TableCell>{teacher.subject}</TableCell>
                      <TableCell>{teacher.rating}</TableCell>
                      <TableCell>{teacher.students}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
