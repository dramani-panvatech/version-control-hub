
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Settings,
  LayoutDashboard,
  UserCheck,
  Clock,
  Package,
  CreditCard,
  HelpCircle,
  User,
  LogOut,
  Bell,
  Search,
  Menu,
  X
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const menuItems = [
    { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
    { title: 'Customers', url: '/dashboard/customers', icon: Users },
    { title: 'Provider', url: '/dashboard/provider', icon: UserCheck },
    { title: 'Calendar', url: '/dashboard/calendar', icon: Calendar },
    { title: 'Services', url: '/dashboard/services', icon: Package },
    { title: 'Payment', url: '/dashboard/payment', icon: CreditCard },
    { title: 'Settings', url: '/dashboard/settings', icon: Settings },
  ];

  const handleSignOut = () => {
    console.log('User signed out');
    navigate('/signin');
  };

  const MenuItemWithTooltip = ({ item, children }: { item: { title: string; url: string; icon: any }, children: React.ReactNode }) => {
    if (!isCollapsed) {
      return <>{children}</>;
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side="right" className="ml-2">
          <p>{item.title}</p>
        </TooltipContent>
      </Tooltip>
    );
  };

  const ActionWithTooltip = ({ title, children }: { title: string, children: React.ReactNode }) => {
    if (!isCollapsed) {
      return <>{children}</>;
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side="right" className="ml-2">
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    );
  };

  return (
    <TooltipProvider delayDuration={0}>
      <Sidebar className={`border-r border-gray-200 bg-white transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-80'}`}>
        <SidebarHeader className={`p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 ${isCollapsed ? 'px-2' : 'px-6'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Clock className="h-5 w-5 text-white" />
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-lg font-bold text-gray-900">FlowTime</h1>
                  <p className="text-xs text-gray-500 font-medium">Admin Dashboard</p>
                </div>
              )}
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={toggleSidebar}
            >
              {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </Button>
          </div>
          
          {!isCollapsed && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search..." 
                className="pl-10 h-9 bg-white/70 border-gray-200 focus:bg-white"
              />
            </div>
          )}
        </SidebarHeader>

        <SidebarContent className="px-2 py-4">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <MenuItemWithTooltip item={item}>
                      <SidebarMenuButton asChild>
                        <NavLink
                          to={item.url}
                          className={({ isActive }) =>
                            `group flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                              isActive
                                ? 'bg-[#1E3A8A] text-white shadow-lg'
                                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                            } ${isCollapsed ? 'justify-center w-10 h-10' : 'space-x-3'}`
                          }
                        >
                          <item.icon className="h-5 w-5 flex-shrink-0" />
                          {!isCollapsed && <span className="font-medium">{item.title}</span>}
                        </NavLink>
                      </SidebarMenuButton>
                    </MenuItemWithTooltip>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="px-2 py-4 border-t border-gray-100 bg-gray-50/50">
          <div className="space-y-2">
            {!isCollapsed && (
              <div className="flex items-center space-x-3 px-3 py-3 rounded-lg bg-white border border-gray-200">
                <div className="h-8 w-8 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Dr. Sarah Johnson</p>
                  <p className="text-xs text-gray-500">sarah@flowtime.com</p>
                </div>
              </div>
            )}

            <ActionWithTooltip title="Help & Support">
              <NavLink
                to="/dashboard/help"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#1E3A8A] text-white'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-white'
                  } ${isCollapsed ? 'justify-center w-10 h-10' : 'space-x-3'}`
                }
              >
                <HelpCircle className="h-4 w-4" />
                {!isCollapsed && <span>Help & Support</span>}
              </NavLink>
            </ActionWithTooltip>
            
            <ActionWithTooltip title="Your Profile">
              <NavLink
                to="/dashboard/profile"
                className={({ isActive }) =>
                  `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-[#1E3A8A] text-white'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-white'
                  } ${isCollapsed ? 'justify-center w-10 h-10' : 'space-x-3'}`
                }
              >
                <User className="h-4 w-4" />
                {!isCollapsed && <span>Your Profile</span>}
              </NavLink>
            </ActionWithTooltip>

            <ActionWithTooltip title="Sign Out">
              <Button
                onClick={handleSignOut}
                variant="ghost"
                className={`w-full px-3 py-2 h-auto text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200 ${isCollapsed ? 'justify-center w-10 h-10' : 'justify-start'}`}
              >
                <LogOut className="h-4 w-4" />
                {!isCollapsed && <span className="ml-3">Sign Out</span>}
              </Button>
            </ActionWithTooltip>
          </div>
        </SidebarFooter>
      </Sidebar>
    </TooltipProvider>
  );
};

export default AdminSidebar;
