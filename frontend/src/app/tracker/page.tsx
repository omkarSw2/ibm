"use client";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DndContext } from "@/context/DndContext";
import React from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import { Metadata } from "next";

type Cards = {
  id: number;
  title: string;
  components: {
    image: string | null;
    createdAt: string;

    id: number;
    name: string;
  }[];
};
const cardsData = [
  {
    id: 0,
    title: "low",
    components: [
      {
        id: 70,
        name: "Slow Loading Time for Large Images",
        image: "",
        createdAt: "2024-01-19T14:00:00Z",
      },
      {
        id: 80,
        name: "Cosmetic Issue on Login Screen",
        image: "https://example.com/bug-images/cosmetic-issue.png",
        createdAt: "2024-01-18T11:00:00Z",
      },
    ],
  },
  {
    id: 1,
    title: "Major",
    components: [
      {
        id: 30,
        name: "Slow Performance on Login",
        image: "https://example.com/bug-images/performance.png",
        createdAt: "2024-01-23T10:00:00Z",
      },
      {
        id: 40,
        name: "Feature Missing in Specific Workflow",
        image: "https://example.com/bug-images/missing-feature.png",
        createdAt: "2024-01-22T18:00:00Z",
      },
    ],
  },
  {
    id: 2,
    title: "Medium",
    components: [
      {
        id: 50,
        name: "UI Glitch on Button Click",
        image: "https://example.com/bug-images/ui-glitch.png",
        createdAt: "2024-01-21T09:00:00Z",
      },
      {
        id: 60,
        name: "Minor Typo in Error Message",
        image: null,
        createdAt: "2024-01-20T16:00:00Z",
      },
    ],
  },
  {
    id: 3,
    title: "Critical",
    components: [
      {
        id: 10,
        name: "Application Crash on Startup",
        image: "https://example.com/bug-images/crash.png",
        createdAt: "2024-01-25T12:00:00Z",
      },
      {
        id: 20,
        name: "Data Loss During Save",
        image: "https://example.com/bug-images/data-loss.png",
        createdAt: "2024-01-24T15:30:00Z",
      },
    ],
  },
];

const Tracerpage = () => {
  const [data, setData] = React.useState<Cards[] | []>([]);
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId !== destination.droppableId) {
      const newData = [...JSON.parse(JSON.stringify(data))];
      const oldDroppableIndex = newData.findIndex(
        (x) => x.id == source.droppableId.split("droppable")[1]
      );
      const newDroppableIndex = newData.findIndex(
        (x) => x.id == destination.droppableId.split("droppable")[1]
      );
      const [item] = newData[oldDroppableIndex].components.splice(
        source.index,
        1
      );
      newData[newDroppableIndex].components.splice(destination.index, 0, item);
      setData([...newData]);
    } else {
      const newData = [...JSON.parse(JSON.stringify(data))];
      const droppableIndex = newData.findIndex(
        (x) => x.id == source.droppableId.split("droppable")[1]
      );
      const [item] = newData[droppableIndex].components.splice(source.index, 1);
      newData[droppableIndex].components.splice(destination.index, 0, item);
      setData([...newData]);
    }
  };
  React.useEffect(() => {
    setData(cardsData);
  }, []);

  return (
    <>
      <h1 className="text-center mt-8 mb-3 font-bold text-[25px] ">
        Drag and Drop Application
      </h1>
      <div className="flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Report Bug </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Report Bug</DialogTitle>
              <DialogDescription>
                Please specify the Bug you have encounterd.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Description
                </Label>
                <Textarea
                  className="col-span-3"
                  placeholder="Type your message here."
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Category
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3 ">
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>severity</SelectLabel>
                      <SelectItem value="Critical">Critical</SelectItem>
                      <SelectItem value="Major">Major</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  File
                </Label>
                <Input type="file" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full">
                Create Bug
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <DndContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 justify-between my-20 mx-4 flex-col lg:flex-row">
          {data.map((val, index) => {
            return (
              <Droppable key={index} droppableId={`droppable${index}`}>
                {(provided) => (
                  <div
                    className="p-5 lg:w-1/3 w-full bg-white  border-gray-400 border border-dashed"
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    <h2 className="text-center font-bold mb-6 text-black">
                      {val.title}
                    </h2>
                    {val.components?.map((component, index) => (
                      <Draggable
                        key={component.id}
                        draggableId={component.id.toString()}
                        index={index}>
                        {(provided) => (
                          <div
                            className="bg-gray-200 mx-1 px-4 py-3 my-3 flex "
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                            ref={provided.innerRef}>
                            {component.name}{" "}
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="ml-2">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Are you absolutely sure?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your Bug Report and
                                    remove your data from our servers.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction className="bg-red-500 hover:bg-red-700 text-white font-bold ">
                                    Continue
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            <Button
                              variant="outline"
                              size="icon"
                              className="ml-2">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </div>
      </DndContext>
    </>
  );
};

export default Tracerpage;
