"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

const timezones = [
    { value: "Asia/Jakarta", label: "Indonesia/Jakarta" },
    { value: "Asia/Singapore", label: "Singapore" },
    { value: "Australia/Sydney", label: "Australia/Sydney" },
];

export function ComboboxButton({ socket, reconnectSocket, onTimezoneSelect }) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    const handleSelect = (selectedValue) => {
        const newValue = selectedValue === value ? "" : selectedValue;
        setValue(newValue);
        setOpen(false);

        if (onTimezoneSelect) {
            onTimezoneSelect(newValue); // Update timezone in parent component
        }

        if (socket) socket.disconnect();
        const newSocket = reconnectSocket();

        if (newSocket && newValue) {
            //request data to socket 
            newSocket.emit("getTemperatureData");
        }
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? timezones.find((timezone) => timezone.value === value)?.label
                        : "Select timezone"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search timezone" />
                    <CommandList>
                        <CommandEmpty>No Timezone found.</CommandEmpty>
                        <CommandGroup>
                            {timezones.map((timezone) => (
                                <CommandItem
                                    key={timezone.value}
                                    value={timezone.value}
                                    onSelect={() => handleSelect(timezone.value)}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === timezone.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {timezone.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
