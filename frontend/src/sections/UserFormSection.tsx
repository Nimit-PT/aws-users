"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast, { Toaster } from "react-hot-toast";
import { UserFormDataType, userSchema } from "@/validation/UserSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserPlus, Users, Mail, Phone, MapPin, Clock, Trash2 } from "lucide-react";

// Extended interface to include createdAt
interface UserWithTimestamp extends UserFormDataType {
  createdAt: string;
  id?: string;
}

const UserForm: React.FC = () => {
  const [users, setUsers] = useState<UserWithTimestamp[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormDataType>({
    resolver: zodResolver(userSchema),
  });

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch all users
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3001/user");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        toast.error("Failed to fetch users");
      }
    } catch (error) {
      toast.error("Error fetching users");
    }
  };

  const onSubmit = async (data: UserFormDataType) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:3001/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Fetch updated list of users instead of manually adding
        await fetchUsers();
        toast.success("User submitted successfully!");
        reset();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to submit user");
      }
    } catch (error) {
      toast.error("Error submitting user");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Delete user function (placeholder - implement actual deletion logic)
  const deleteUser = async (userId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/user/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchUsers();
        toast.success("User deleted successfully!");
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-right" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Registration Form */}
        <Card className="">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-bold text-primary">
              <UserPlus className="w-6 h-6" />
              User Registration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <Input
                    {...register("firstName")}
                    id="firstName"
                    className={`w-full ${errors.firstName ? "border-red-500" : ""}`}
                    placeholder="Enter first name"
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <Input
                    {...register("lastName")}
                    id="lastName"
                    className={`w-full ${errors.lastName ? "border-red-500" : ""}`}
                    placeholder="Enter last name"
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    {...register("email")}
                    id="email"
                    type="email"
                    className={`w-full pl-10 ${errors.email ? "border-red-500" : ""}`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    {...register("phone")}
                    id="phone"
                    type="tel"
                    className={`w-full pl-10 ${errors.phone ? "border-red-500" : ""}`}
                    placeholder="(555) 123-4567"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    {...register("address")}
                    id="address"
                    className={`w-full pl-10 ${errors.address ? "border-red-500" : ""}`}
                    placeholder="1234 Main St, City, Country"
                  />
                </div>
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address.message}</p>}
              </div>

              <Button type="submit" className="w-full mt-4 flex items-center justify-center gap-2">
                <UserPlus className="w-5 h-5" />
                Submit User
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* User List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl font-bold text-primary">
              <Users className="w-6 h-6" />
              Registered Users
              <span className="ml-2 text-sm text-gray-500 font-normal">({users.length})</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {users.length === 0 ? (
              <div className="text-center text-gray-500 py-8">No users registered yet</div>
            ) : (
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2  lg:grid-cols-1 2xl:grid-cols-3 max-h-[600px] overflow-y-auto">
                {users.map((user) => (
                  <div
                    key={user.email}
                    className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 flex items-start justify-between"
                  >
                    <div className="flex-grow pr-4">
                      <div className="flex items-center mb-2">
                        <UserPlus className="w-5 h-5 text-primary mr-2" />
                        <h3 className="font-semibold text-lg text-gray-800">
                          {user.firstName} {user.lastName}
                        </h3>
                      </div>
                      <div className="space-y-1 text-gray-600 text-sm">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 text-gray-500 mr-2" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 text-gray-500 mr-2" />
                          <span>{user.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                          <span>{user.address}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="w-4 h-4 mr-2" />
                          {formatDate(user.createdAt)}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteUser(user.id || "")}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Delete User"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserForm;
