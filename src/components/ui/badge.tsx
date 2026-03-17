import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-xhs-red/10 text-xhs-red hover:bg-xhs-red/20",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        marathon: "bg-running-green/10 text-running-green hover:bg-running-green/20",
        training: "bg-running-blue/10 text-running-blue hover:bg-running-blue/20",
        gear: "bg-running-orange/10 text-running-orange hover:bg-running-orange/20",
        jogging: "bg-running-purple/10 text-running-purple hover:bg-running-purple/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
