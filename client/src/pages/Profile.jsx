/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function Profile({
  username = "johndoe",
  fullName = "John Doe",
  avatarUrl = "https://i.pravatar.cc/150?u=johndoe",
  studentId = "S12345",
  major = "Computer Science",
  yearOfStudy = 3,
  email = "john.doe@university.edu",
  bio = "Passionate about coding and always eager to learn new technologies.",
}) {

  return (
    <>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={avatarUrl} alt={fullName} />
            <AvatarFallback>
              {fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-2xl">{fullName}</CardTitle>
            <p className="text-muted-foreground">@{username}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold">Student ID</h3>
              <p>{studentId}</p>
            </div>
            <div>
              <h3 className="font-semibold">Major</h3>
              <p>{major}</p>
            </div>
            <div>
              <h3 className="font-semibold">Year of Study</h3>
              <p>
                {yearOfStudy}
                {getOrdinalSuffix(yearOfStudy)} year
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <a
                href={`mailto:${email}`}
                className="text-primary hover:underline"
              >
                {email}
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Bio</h3>
            <p>{bio}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              <Badge>React</Badge>
              <Badge>TypeScript</Badge>
              <Badge>Node.js</Badge>
              <Badge>Python</Badge>
              <Badge>Data Structures</Badge>
            </div>
          </div>
          {/* Login/Logout Button */}
          <div className="mt-4"></div>
        </CardContent>
      </Card>
    </>
  );
}

function getOrdinalSuffix(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}
