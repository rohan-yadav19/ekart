import React, { use } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import userlogo from "../assets/user.jpg";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/userSlice";
const Profile = () => {
  const { user } = useSelector((store) => store.user);
  const params = useParams();
  const userId = params.userId;
  const [updateUser, setUpdateUser] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phoneNo: user?.phoneNo,
    address: user?.address,
    city: user?.city,
    zipCode: user?.zipCode,
    profilepic: user?.profilepic,
    role: user?.role,
  });
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUpdateUser({
      ...updateUser,
      profilepic: URL.createObjectURL(selectedFile),
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    try {
      //use formData for text and file
      const formData = new FormData();
      formData.append("firstName", updateUser.firstName);
      formData.append("lastName", updateUser.lastName);
      formData.append("email", updateUser.email);
      formData.append("phoneNo", updateUser.phoneNo);
      formData.append("address", updateUser.address);
      formData.append("city", updateUser.city);
      formData.append("zipCode", updateUser.zipCode);
      formData.append("role", updateUser.role);
      if (file) {
        formData.append("files", file); //image file for backend multer
      }
      const res = await axios.put(
        `http://localhost:8000/api/v1/user/update/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="pt-34 min-h-screen bg-gray-100">
      <Tabs defaultValue="profile" className="max-w-7xl mx-auto items-center">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <div>
            <div className="flex flex-col justify-center items-center bg-gray-100">
              <h1 className="font-bold mb-t text-2xl text-gray-800">
                Update Profile
              </h1>
              <div className="w-full flex gap-10 justify-between items-start px-7 max-w 2xl">
                {/* profile picture */}
                <div className="flex flex-col items-center">
                  <img
                    src={updateUser?.profilepic || userlogo}
                    alt="profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-pink-800"
                  />
                  <Label className="mt-4 cursor-pointer bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
                    Change Picture
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </Label>
                </div>
                {/* profile form */}
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 shadow-lg p-5 rounded-lg bg-white"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="block text-sm font-medium">
                        First Name
                      </Label>
                      <Input
                        type="text"
                        name="firstName"
                        placeholder="john"
                        value={updateUser.firstName}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium">
                        Last Name
                      </Label>
                      <Input
                        type="text"
                        name="lastName"
                        placeholder="doe"
                        value={updateUser.lastName}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium">Email</Label>
                    <Input
                      type="email"
                      name="email"
                      disabled
                      value={updateUser.email}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium">
                      Phone Number
                    </Label>
                    <Input
                      type="text"
                      name="phoneNo"
                      placeholder="Enter your Contact Number"
                      value={updateUser.phoneNo}
                      onChange={handleChange}
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium">Address</Label>
                    <Input
                      type="text"
                      name="address"
                      value={updateUser.address}
                      onChange={handleChange}
                      placeholder="Enter your Address"
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="block text-sm font-medium">City</Label>
                      <Input
                        type="text"
                        name="city"
                        value={updateUser.city}
                        onChange={handleChange}
                        placeholder="Enter your City"
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium">
                        Zip Code
                      </Label>
                      <Input
                        type="text"
                        name="zipCode"
                        value={updateUser.zipCode}
                        onChange={handleChange}
                        placeholder="Enter your ZipCode"
                        className="w-full border rounded-lg px-3 py-2 mt-1"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full mt-4 bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg"
                  >
                    Update Profile
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you&apos;ll be logged
                out.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Current Password</Label>
                <Input id="tabs-demo-current" type="password" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New Password</Label>
                <Input id="tabs-demo-new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
