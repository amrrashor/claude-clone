export const  Greeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) {
        return "Good morning";
    } else if (hour < 18) {
        return "Good afternoon";
    } else {
        return "Good evening";
    }
}

export const  startScreenShare = async () => {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        const videoElement = document.getElementById("screen-video") as any;
        videoElement.srcObject = stream;
    } catch (error) {
        console.error("Error sharing screen:", error);
    }
}