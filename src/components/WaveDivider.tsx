import { cn } from "@/lib/utils";

export function WaveDivider({
    className,
    flipped = false,
    svgClassName,
    pathData,
}: {
    className?: string;
    flipped?: boolean;
    svgClassName?: string;
    pathData?: string;
}) {
    return (
        <div className={cn("w-full overflow-hidden leading-[0]", className, flipped && "rotate-180")}>
            <svg
                className={cn("relative block w-full h-[90px] md:h-[140px]", svgClassName)}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
            >
                <path
                    d={
                        pathData ??
                        "M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-8.73,250.45,8.61C823.78,40,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                    }
                    className="fill-current"
                ></path>
            </svg>
        </div>
    );
}
