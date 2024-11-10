"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  X,
  HelpCircle,
  BookOpen,
  PenTool,
  ChevronDown,
  ChevronUp,
  Users,
  Brain,
  Search,
  SortAsc,
  SortDesc,
  Lightbulb,
  Zap,
  TrendingUp,
} from "lucide-react";
import { Loader2 } from "lucide-react";
import Confetti from "react-confetti";
import { Navigate, useNavigate } from "react-router-dom";

// Sample data with more examples
const doubtsData = {
  conceptual: [
    {
      id: 1,
      summary:
        "Understanding **Linked_List** operations, including **insertion**, **deletion**, and **reversing** a linked list",
      count: 5,
      complexity: 3,
      timeArrived: new Date("2023-05-10T10:00:00"),
      isAiSummarized: true,
      aiRating: "Expected Doubt",
      originalDoubts: [
        "How do you insert a new node in a **Linked_List**?",
        "What is the algorithm to delete a node from a **Linked_List**?",
        "How do you reverse a **Linked_List** in place?",
      ],
    },
    {
      id: 2,
      summary:
        "**Time_Complexity** analysis of common sorting algorithms such as **Quick_Sort** , **Merge_Sort** , and **Bubble_Sort**",
      count: 3,
      complexity: 2,
      timeArrived: new Date("2023-05-10T10:05:00"),
      isAiSummarized: false,
      aiRating: "Fresh Doubt",
    },
    {
      id: 3,
      summary:
        "Exploring **Binary_Search_Tree** properties and operations, including **insertion** , **deletion**, and **searching**",
      count: 4,
      complexity: 4,
      timeArrived: new Date("2023-05-10T10:10:00"),
      isAiSummarized: true,
      aiRating: "Expected Doubt",
      originalDoubts: [
        "What is the process for inserting a node in a **Binary_Search_Tree**?",
        "How do you delete a node in a **Binary_Search_Tree**?",
        "How does a **Binary_Search_Tree** search for a node efficiently?",
      ],
    },
    {
      id: 4,
      summary:
        "Understanding the concept of **Hash_Tables**, their structure, and resolving **collisions**",
      count: 6,
      complexity: 3,
      timeArrived: new Date("2023-05-10T10:15:00"),
      isAiSummarized: false,
      aiRating: "Most Asked",
    },
    {
      id: 5,
      summary:
        "Analyzing the working and implementation of **Dijkstra's_Algorithm** for finding the shortest path in a **weighted_graph**",
      count: 2,
      complexity: 3,
      timeArrived: new Date("2023-05-10T10:20:00"),
      isAiSummarized: true,
      aiRating: "Fresh Doubt",
      originalDoubts: [
        "How does **Dijkstra's_Algorithm** work to find the shortest path?",
        "What is the **time_complexity** of **Dijkstra's_Algorithm**?",
        "Can **Dijkstra's_Algorithm** handle negative edge weights?",
      ],
    },
  ],
  theoretical: [
    {
      id: 6,
      summary:
        "Understanding the theory behind **Big_O_notation** and its role in **algorithm_analysis** for measuring time and space complexities",
      count: 7,
      complexity: 4,
      timeArrived: new Date("2023-05-10T10:02:00"),
      isAiSummarized: true,
      aiRating: "Most Asked",
      originalDoubts: [
        "What is **Big_O_notation** and why is it important in **algorithm_analysis**?",
        "How do we calculate the **time_complexity** of an algorithm using **Big_O_notation**?",
        "Can **Big_O_notation** describe both **time** and **space_complexity**?",
      ],
    },
    {
      id: 7,
      summary:
        "Understanding and applying **Greedy_Algorithms** to problems like **Huffman_Coding** and **Fractional_Knapsack**",
      count: 4,
      complexity: 3,
      timeArrived: new Date("2023-05-10T10:07:00"),
      isAiSummarized: false,
      aiRating: "Expected Doubt",
    },
    {
      id: 8,
      summary:
        "The working and analysis of **Depth_First_Search** (DFS) and **Breadth_First_Search** (BFS) algorithms in **graphs**",
      count: 5,
      complexity: 4,
      timeArrived: new Date("2023-05-10T10:12:00"),
      isAiSummarized: true,
      aiRating: "Fresh Doubt",
      originalDoubts: [
        "What is the difference between **DFS** and **BFS** in **graph_traversal**?",
        "How do you implement **DFS** and **BFS** in an undirected graph?",
        "What are the time and space complexities of **DFS** and **BFS**?",
      ],
    },
    {
      id: 9,
      summary:
        "Examining the **Divide_and_Conquer** approach and its application in algorithms like **Merge_Sort** and **Quick_Sort**",
      count: 6,
      complexity: 3,
      timeArrived: new Date("2023-05-10T10:17:00"),
      isAiSummarized: false,
      aiRating: "Most Asked",
    },
    {
      id: 10,
      summary:
        "Understanding **Dynamic_Programming** and its applications in problems like **Longest_Common_Subsequence** and **Knapsack_Problem**",
      count: 3,
      complexity: 4,
      timeArrived: new Date("2023-05-10T10:22:00"),
      isAiSummarized: true,
      aiRating: "Expected Doubt",
      originalDoubts: [
        "What is **Dynamic_Programming** and how is it used to solve **overlapping_subproblems**?",
        "How do you solve the **Knapsack_Problem** using **Dynamic_Programming**?",
        "What is the difference between **Dynamic_Programming** and **Greedy_Algorithms**?",
      ],
    },
  ],
};

const colorPalette = [
  "bg-gradient-to-r from-red-200 to-red-300 text-red-800",
  "bg-gradient-to-r from-blue-200 to-blue-300 text-blue-800",
  "bg-gradient-to-r from-green-200 to-green-300 text-green-800",
  "bg-gradient-to-r from-yellow-200 to-yellow-300 text-yellow-800",
  "bg-gradient-to-r from-purple-200 to-purple-300 text-purple-800",
  "bg-gradient-to-r from-pink-200 to-pink-300 text-pink-800",
];

const highlightKeywords = (text: string) => {
  let colorIndex = 0;
  const words = text.split(" ");
  return words.map((word, index) => {
    if (word.startsWith("**") && word.endsWith("**")) {
      colorIndex = (colorIndex + 1) % colorPalette.length;
      return (
        <Badge key={index} className={`mx-1 ${colorPalette[colorIndex]}`}>
          {word.slice(2, -2)}
        </Badge>
      );
    }
    return ` ${word} `;
  });
};

const ComplexityBadge = ({ complexity }: { complexity: number }) => {
  const getComplexityColor = (complexity: number) => {
    if (complexity <= 2)
      return "bg-gradient-to-r from-green-200 to-green-300 text-green-800";
    if (complexity <= 4)
      return "bg-gradient-to-r from-yellow-200 to-yellow-300 text-yellow-800";
    return "bg-gradient-to-r from-red-200 to-red-300 text-red-800";
  };
  return (
    <Badge className={`${getComplexityColor(complexity)}`}>
      Complexity: {complexity}
    </Badge>
  );
};

const AiRatingBadge = ({ rating }: { rating: string }) => {
  const getAiRatingIcon = (rating: string) => {
    switch (rating) {
      case "Expected Doubt":
        return <Lightbulb className="w-4 h-4 mr-1" />;
      case "Fresh Doubt":
        return <Zap className="w-4 h-4 mr-1" />;
      case "Most Asked":
        return <TrendingUp className="w-4 h-4 mr-1" />;
      default:
        return null;
    }
  };
  return (
    <Badge variant="outline" className="flex items-center">
      {getAiRatingIcon(rating)}
      {rating}
    </Badge>
  );
};

const DoubtItem = ({
  doubt,
  type,
  isChecked,
  onCheckChange,
}: {
  doubt: any;
  type: "conceptual" | "theoretical";
  isChecked: boolean;
  onCheckChange: (id: number) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const navigate = useNavigate();

  const handleOnClick = (type) => {
    if (type === "conceptual") {
      window.location.href =
        "http://localhost:3000/#json=hPYnls6iKkkp4CcW8clEt,Ap5-PA24lam1KKJ0kaFyXQ";
    } else {
      setTimeout(() => {
        navigate("/graphflow");
      }, 1);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`mb-4 ${isChecked ? "opacity-50" : ""} overflow-hidden`}>
        <CardHeader className="pb-2">
          <div className="flex items-start space-x-4">
            <Checkbox
              checked={isChecked}
              onCheckedChange={() => onCheckChange(doubt.id)}
              className="mt-1"
            />
            <div className="flex-1">
              <CardTitle className="text-lg">
                {doubt.isAiSummarized && (
                  <Badge variant="secondary" className="mb-2">
                    AI Summarized
                  </Badge>
                )}
                {highlightKeywords(doubt.summary)}
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        </CardHeader>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Separator />
              <CardContent className="pt-4">
                <CardDescription className="mb-2 flex flex-wrap gap-2">
                  <Badge variant="outline">
                    <Users className="w-4 h-4 mr-1" /> {doubt.count}
                  </Badge>
                  <ComplexityBadge complexity={doubt.complexity} />
                  <AiRatingBadge rating={doubt.aiRating} />
                </CardDescription>
                {doubt.isAiSummarized && (
                  <Collapsible>
                    <CollapsibleTrigger asChild>
                      <Button variant="outline" size="sm" className="mb-2">
                        View Original Doubts
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <Card>
                        <CardContent className="pt-4">
                          <ul className="list-disc pl-5 space-y-1">
                            {doubt.originalDoubts.map(
                              (originalDoubt: string, index: number) => (
                                <li key={index}>{originalDoubt}</li>
                              )
                            )}
                          </ul>
                        </CardContent>
                      </Card>
                    </CollapsibleContent>
                  </Collapsible>
                )}
              </CardContent>
              <Separator />
              <CardFooter className="pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleOnClick(type)}
                >
                  {type === "conceptual" ? (
                    <PenTool className="h-4 w-4 mr-2" />
                  ) : (
                    <BookOpen className="h-4 w-4 mr-2" />
                  )}
                  {type === "conceptual"
                    ? "Open in IViz"
                    : "Open in Graphalogue"}
                </Button>
              </CardFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};

interface FloatingComponentProps {
  onClose: () => void;
}

export default function DoubtModal({ onClose }: FloatingComponentProps) {
  const [activeTab, setActiveTab] = useState("conceptual");
  const [sortBy, setSortBy] = useState("count");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isCollecting, setIsCollecting] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [timer, setTimer] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [checkedDoubts, setCheckedDoubts] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isCollecting) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setIsCollecting(false);
            setIsProcessing(true);
            setTimeout(() => {
              setIsProcessing(false);
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 5000);
            }, 3000);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isCollecting]);

  const sortDoubts = (doubts: any[]) => {
    return [...doubts].sort((a, b) => {
      let comparison = 0;
      if (sortBy === "count") comparison = b.count - a.count;
      else if (sortBy === "complexity")
        comparison = b.complexity - a.complexity;
      else if (sortBy === "time")
        comparison = b.timeArrived.getTime() - a.timeArrived.getTime();
      else if (sortBy === "length")
        comparison = b.summary.length - a.summary.length;
      return sortOrder === "asc" ? comparison : -comparison;
    });
  };

  const filterDoubts = (doubts: any[]) => {
    return doubts.filter(
      (doubt) =>
        doubt.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (doubt.originalDoubts &&
          doubt.originalDoubts.some((d: string) =>
            d.toLowerCase().includes(searchTerm.toLowerCase())
          ))
    );
  };

  const handleCheckChange = (id: number) => {
    setCheckedDoubts((prev) =>
      prev.includes(id)
        ? prev.filter((doubtId) => doubtId !== id)
        : [...prev, id]
    );
  };

  const getFilteredAndSortedDoubts = useMemo(() => {
    const doubts = doubtsData[activeTab as keyof typeof doubtsData];
    const filteredDoubts = filterDoubts(doubts);
    const sortedDoubts = sortDoubts(filteredDoubts);
    return sortedDoubts.sort((a, b) =>
      checkedDoubts.includes(a.id) ? 1 : checkedDoubts.includes(b.id) ? -1 : 0
    );
  }, [activeTab, sortBy, sortOrder, searchTerm, checkedDoubts]);

  const loadingMessages = [
    "Analyzing student queries...",
    "Categorizing doubts by complexity...",
    "Identifying common themes...",
    "Preparing AI summaries...",
    "Organizing doubts for easy navigation...",
  ];

  const progressPercentage = useMemo(() => {
    const totalDoubts = doubtsData[activeTab as keyof typeof doubtsData].length;
    return (checkedDoubts.length / totalDoubts) * 100;
  }, [activeTab, checkedDoubts]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-primary/10 to-primary/5">
        <h2 className="text-2xl font-bold">Student Doubts</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>
      {isCollecting || isProcessing ? (
        <div className="flex-grow flex flex-col items-center justify-center space-y-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Loader2 className="h-12 w-12 text-primary" />
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.p
              key={
                isProcessing
                  ? "processing"
                  : loadingMessages[
                      Math.floor(Math.random() * loadingMessages.length)
                    ]
              }
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-semibold text-center max-w-md"
            >
              {isProcessing
                ? loadingMessages[
                    Math.floor(Math.random() * loadingMessages.length)
                  ]
                : loadingMessages[
                    Math.floor(Math.random() * loadingMessages.length)
                  ]}
            </motion.p>
          </AnimatePresence>
          {!isProcessing && (
            <p className="text-sm text-muted-foreground">
              Time remaining: {timer}s
            </p>
          )}
        </div>
      ) : (
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-grow flex flex-col"
        >
          <div className="flex justify-between items-center px-4 py-2 border-b bg-gradient-to-r from-secondary/10 to-secondary/5">
            <TabsList>
              <TabsTrigger value="conceptual" className="flex items-center">
                <Brain className="w-4 h-4 mr-2" />
                Conceptual
              </TabsTrigger>
              <TabsTrigger value="theoretical" className="flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                Theoretical
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Search doubts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48"
              />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  {({ open }) => <SelectValue placeholder="Sort by" />}
                </SelectTrigger>
                <SelectContent className="max-h-[200px] overflow-y-auto">
                  <SelectItem value="count">Most Asked</SelectItem>
                  <SelectItem value="complexity">Complexity</SelectItem>
                  <SelectItem value="time">Time Arrived</SelectItem>
                  <SelectItem value="length">Doubt Length</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
                }
              >
                {sortOrder === "asc" ? (
                  <SortAsc className="h-4 w-4" />
                ) : (
                  <SortDesc className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <div className="px-4 py-2 bg-muted">
            <Progress value={progressPercentage} className="w-full" />
            <p className="text-sm text-muted-foreground mt-1">
              Progress: {Math.round(progressPercentage)}% doubts tackled
            </p>
          </div>
          <ScrollArea className="flex-grow">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + sortBy + sortOrder + searchTerm}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="p-4 space-y-4"
              >
                {getFilteredAndSortedDoubts.map((doubt) => (
                  <DoubtItem
                    key={doubt.id}
                    doubt={doubt}
                    type={activeTab as "conceptual" | "theoretical"}
                    isChecked={checkedDoubts.includes(doubt.id)}
                    onCheckChange={handleCheckChange}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </ScrollArea>
        </Tabs>
      )}
    </motion.div>
  );
}
