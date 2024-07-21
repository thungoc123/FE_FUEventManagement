import React, { useEffect, useState } from "react";
import {
  Button,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@relume_io/relume-ui";
import { BiBell } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@relume_io/relume-ui";
import { RxChevronRight } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../../../Features/Auth/authSlice";
import { useNavigate } from "react-router-dom";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { RootState } from "../../../Store/Store";
import notificationsSlice from "../../../Features/Utils/notificationsSlice";
import { roleName } from "../../../ulities/ProtectedRoute";

type Props = {
  email?: string | null;
};

const Dropdown: React.FC<Props> = (props) => {
  const [isRole, setRole] = useState("ROLE_VISITOR");

  const navigate = useNavigate();
  const  token = sessionStorage.getItem("token");
  const role = roleName(token);
  console.log(token);
  const email = sessionStorage.getItem("email");
  useEffect(() => {
    if (token) {
      setRole(role);
    }
  }, [token, role]);

  // }, [token]);
  // const dispatch = useDispatch();
  const handleLogout = () => {
    // localStorage.removeItem("email");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    localStorage.setItem("notifications", JSON.stringify([]));
    // dispatch(clearToken());
    // persistor.purge();
    navigate("/");
  };

  const NavigationAuth = (roleName: string) => {
    switch (roleName) {
      case "ROLE_EO":
        navigate("/eventoperator/dashboard/analytics");
        break;
      case "ROLE_SPONSOR":
        navigate("/sponsor/dashboard/profit");
        break;
      case "ROLE_VISITOR":
        navigate("/cart");
        break;
      case "ROLE_CHECKING_STAFF":
        navigate("/admin/checkingstaff");
        break;
      case "ROLE_ADMIN":
        navigate("/admin");
        break;
      default:
        navigate("/");
        break;
    }
  };
  // dispatch(clearToken(token))
  const notifications = JSON.parse(localStorage.getItem('notifications'));
  // console.log(notifications)
  return (
    <div className="flex items-center gap-2 justify-self-end md:gap-4">
   
          <DropdownMenu>
              <DropdownMenuTrigger className="relative" style={{border: 'none'}}>
                {notifications.length !== 0 && (
                <div className="absolute bottom-auto left-auto right-2 top-2 size-2 rounded-full outline outline-[3px] outline-offset-0 " style={{color:'#00fff9', background:'#00fff9'}}/>
                )}
                <BiBell className="size-6" style={{color:'#00fff9'}}/>
              </DropdownMenuTrigger>
              {notifications.length !== 0 && (
                <DropdownMenuContent
                className="max-w-[19rem] px-0"
                align="end"
                sideOffset={0}
              >
                <div className="flex flex-col">
                  <div className="flex items-center justify-between px-4 py-2">
                    <DropdownMenuLabel className="p-0">
                      Notifications
                    </DropdownMenuLabel>
                    {/* <a href="#" onClick={() => dispatch(removeAllNotifications(notifications))}>Mark as read</a> */}
                  </div>
                  <DropdownMenuSeparator />
                  <div className="h-full max-h-[14rem] overflow-auto px-2 py-1">
                    {notifications.map((notification) => (
                      <DropdownMenuItem className="mt-2 grid grid-cols-[max-content_1fr] gap-2 px-2 py-1">
                        <div className="flex size-full flex-col items-start justify-start">
                          <img
                            src="https://relume-assets.s3.amazonaws.com/relume-icon.svg"
                            alt="Avatar"
                            className="size-6"
                          />
                        </div>
                        <div>
                          <p>{notification.message}</p>
                          <p className="mt-2 text-sm">
                            {new Date(notification.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </div>
                <DropdownMenuSeparator />
                <div className="flex w-full items-end justify-end px-4 py-2">
                  <Button
                    variant="link"
                    size="link"
                    iconRight={<RxChevronRight />}
                    asChild
                  >
                    <a href="#">View All</a>
                  </Button>
                </div>
              </DropdownMenuContent>
              )}
              
            </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger  className="flex items-center p-0" style={{color:'#00fff9', border:'none'}}>
          {/* <img
                  src="https://relume-assets.s3.amazonaws.com/avatar-image.svg"
                  alt="Avatar"
                  className="size-10 rounded-full object-cover"
                /> */}
          {email}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={0}
          className="mt-1.5 px-0 py-2"
        >
          <DropdownMenuGroup>
            <DropdownMenuItem>
              {isRole === "ROLE_VISITOR" ? (
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    NavigationAuth(isRole);
                  }}
                >
                  My Cart
                </a>
              ) : (
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    NavigationAuth(role);
                  }}
                >
                  Dashboard
                </a>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator className="mx-4" />
            <DropdownMenuItem>
              <a href="" onClick={handleLogout}>
                Log Out
              </a>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Dropdown;
