import React from "react";

const Avatar = ({ src, alt, fallback, className = "" }) => {
  const [imgError, setImgError] = React.useState(false);

  return (
    <div
      className={`rounded-full overflow-hidden bg-zinc-700 flex items-center justify-center ${className}`}
    >
      {src && !imgError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-white font-medium">{fallback}</span>
      )}
    </div>
  );
};

// Component Skeleton cho loading
const UsersListSkeleton = () => {
  // Tạo 5 dòng loading mẫu
  return (
    <div className="space-y-2 p-4">
      {[...Array(5)].map((_, idx) => (
        <div
          key={idx}
          className="animate-pulse flex items-center gap-3 p-3 rounded-lg"
        >
          <div className="rounded-full bg-zinc-700 h-10 w-10" />
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 bg-zinc-700 rounded w-3/4" />
            <div className="h-4 bg-zinc-700 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

const UsersList = ({
  users,
  selectedUser,
  isLoading,
  setSelectedUser,
  onlineUsers,
}) => {
  return (
    <div className="border-r border-zinc-800">
      <div className="flex flex-col h-[calc(100vh-11.5rem)]">
        {/* Thay ScrollArea bằng div với overflow-y-auto */}
        <div className=" overflow-y-auto">
          <div className="space-y-2 p-4 ">
            {isLoading ? (
              <UsersListSkeleton />
            ) : (
              users.map((user) => (
                <div
                  key={user._id}
                  onClick={() => {
                    setSelectedUser(user);
                  }}
                  className={`flex items-center justify-center lg:justify-start gap-3 p-3 
                    rounded-lg cursor-pointer transition-colors 
                    ${
                      selectedUser?.clerkId === user.clerkId
                        ? "bg-zinc-800"
                        : "hover:bg-zinc-800/50"
                    }`}
                >
                  <div className="relative">
                    <Avatar
                      src={user.imageUrl}
                      alt={user.fullName}
                      fallback={user.fullName[0]}
                      className="w-10 h-10 md:w-12 md:h-12"
                    />
                    {/* Indicator trạng thái online */}
                    <div
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-zinc-900 ${
                        onlineUsers.has(user.clerkId)
                          ? "bg-green-500"
                          : "bg-zinc-500"
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0 lg:block hidden">
                    <span className="font-medium truncate">
                      {user.fullName}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
