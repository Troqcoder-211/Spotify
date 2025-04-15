import React from "react";
import { UserIcon, Headphones } from "lucide-react";
import UserStatusCard from "./UserStatusCard";
const FriendListeningSidebar = () => {
  const userList = [
    {
      avatarUrl: "",
      displayName: "As a Programmer null",
      status: "Offline",
    },
    {
      avatarUrl: "https://i.pravatar.cc/100", // demo
      displayName: "Jane Doe",
      status: "Online",
    },
    {
      avatarUrl: "https://i.pravatar.cc/101", // demo
      displayName: "John Smith",
      status: "Offline",
    },
    {
      avatarUrl: "https://i.pravatar.cc/101", // demo
      displayName: "John Smith",
      status: "Offline",
    },
    {
      avatarUrl: "https://i.pravatar.cc/101", // demo
      displayName: "John Smith",
      status: "Offline",
    },
    {
      avatarUrl: "https://i.pravatar.cc/101", // demo
      displayName: "John Smith",
      status: "Offline",
    },
    {
      avatarUrl: "https://i.pravatar.cc/101", // demo
      displayName: "John Smith",
      status: "Offline",
    },
    {
      avatarUrl: "https://i.pravatar.cc/101", // demo
      displayName: "John Smith",
      status: "Offline",
    },
    {
      avatarUrl: "https://i.pravatar.cc/101", // demo
      displayName: "John Smith",
      status: "Offline",
    },
    {
      avatarUrl: "https://i.pravatar.cc/101", // demo
      displayName: "John Smith",
      status: "Offline",
    },
    {
      avatarUrl: "https://i.pravatar.cc/101", // demo
      displayName: "John Smith",
      status: "Offline",
    },
    {
      avatarUrl: "https://i.pravatar.cc/101", // demo
      displayName: "John Smith",
      status: "Offline",
    },
    {
      avatarUrl: "https://i.pravatar.cc/101", // demo
      displayName: "John Smith",
      status: "Offline",
    },
    {
      avatarUrl: "https://i.pravatar.cc/101", // demo
      displayName: "John Smith",
      status: "Offline",
    },
    {
      avatarUrl: "https://i.pravatar.cc/101", // demo
      displayName: "John Smith",
      status: "Offline",
    },
    {
      avatarUrl: "https://i.pravatar.cc/101", // demo
      displayName: "John Smith",
      status: "Offline",
    },
    {
      avatarUrl: "https://i.pravatar.cc/101", // demo
      displayName: "John Smith",
      status: "Offline",
    },
    {
      avatarUrl: "https://i.pravatar.cc/101", // demo
      displayName: "John Smith",
      status: "Offline",
    },
    {
      avatarUrl: "https://i.pravatar.cc/101", // demo
      displayName: "John Smith",
      status: "Offline",
    },
    {
      avatarUrl: "https://i.pravatar.cc/101", // demo
      displayName: "John Smith",
      status: "Offline",
    },
    {
      avatarUrl: "https://i.pravatar.cc/101", // demo
      displayName: "John Smith",
      status: "Offline",
    },
    {
      avatarUrl: "https://i.pravatar.cc/101", // demo
      displayName: "John Smith",
      status: "Offline",
    },
    {
      avatarUrl: "https://i.pravatar.cc/101", // demo
      displayName: "John Smith",
      status: "Offline",
    },
    {
      avatarUrl: "https://i.pravatar.cc/101", // demo
      displayName: "John Smith",
      status: "Offline",
    },
  ];
  return (
    <div className="bg-zinc-900 text-white w-[30%] h-full rounded-lg p-4 flex flex-col overflow-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 text-sm font-medium text-zinc-300">
        <UserIcon className="w-4 h-4" />
        <span>What they're listening to</span>
      </div>
      <hr></hr>

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col text-center ${
          userList.length === 0 ? "justify-center items-center" : ""
        }`}
      >
        {userList.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="bg-zinc-800 rounded-full p-4 mb-4 shadow-md">
              <Headphones className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-lg font-semibold mb-2">
              See What Friends Are Playing
            </h2>
            <p className="text-sm text-zinc-400">
              Login to discover what music your friends are enjoying right now
            </p>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center justify-center mt-4 space-y-2">
            {userList.map((user, index) => (
              <UserStatusCard
                key={index}
                avatarUrl={user.avatarUrl}
                displayName={user.displayName}
                status={user.status}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendListeningSidebar;
