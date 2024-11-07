"use client";

interface MessageCardProps {
  recipientName: string;
  message: string;
  backgroundColor: string;
  image?: string;
  imagePosition?: "top" | "bottom";
  isLink?: boolean;
  hideRecipient?: boolean;
  variant?: "home" | "browse" | "story";
}

export function MessageCard({
  recipientName,
  message,
  backgroundColor,
  image,
  imagePosition = "top",
  isLink = false,
  hideRecipient = false,
  variant = "browse"
}: MessageCardProps) {
  const containerClasses = {
    story: "w-[360px] h-[640px]",
    browse: "w-full aspect-[3/4]",
    home: "w-full aspect-[4/5] min-h-[320px]"
  }[variant];

  const imageClasses = {
    story: "h-[202.5px] w-full object-cover",
    browse: "h-[168.75px] w-full object-cover",
    home: "h-[140px] w-full object-cover"
  }[variant];

  const paddingClasses = {
    story: "p-6",
    browse: "p-6",
    home: "p-4"
  }[variant];

  const textClasses = {
    story: "text-xl",
    browse: "text-lg md:text-xl",
    home: "text-base"
  }[variant];

  // Truncate message for home variant
  const truncateMessage = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  const displayMessage = variant === "home" ? truncateMessage(message, 120) : message;

  const headerContent = (
    <div className="mb-4 flex items-center justify-between gap-4">
      {!hideRecipient && (
        <h3 className="break-words font-indie text-2xl text-black">
          To: {recipientName}
        </h3>
      )}
      {hideRecipient && <div className="h-9" />}
      <span className="flex-shrink-0 text-xl">❤️</span>
    </div>
  );

  const content = (
    <>
      {image && imagePosition === "top" && (
        <img 
          src={image} 
          alt="Message" 
          className={`mb-4 rounded-lg ${imageClasses}`}
        />
      )}
      
      <p className={`break-words font-indie leading-relaxed text-black ${textClasses}`}>
        {displayMessage}
      </p>

      {image && imagePosition === "bottom" && (
        <img 
          src={image} 
          alt="Message" 
          className={`mt-auto rounded-lg ${imageClasses}`}
        />
      )}
    </>
  );

  return (
    <div 
      className={`flex h-full flex-col rounded-lg transition-all hover:shadow-lg ${containerClasses} ${paddingClasses}`}
      style={{ backgroundColor }}
    >
      {headerContent}
      {content}
    </div>
  );
}