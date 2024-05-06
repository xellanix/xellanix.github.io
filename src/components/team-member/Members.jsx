import member1Avatar from "../../assets/member/avatar1.jpg";
import member2Avatar from "../../assets/member/avatar2.jpg";
import member3Avatar from "../../assets/member/avatar3.jpg";

export default function GetMembers() {
	return [
		{
			name: "Donny Andrian",
			role: "President of Xellanix",
			imgSrc: member1Avatar,
		},
		{
			name: "Jenie Josphin",
			role: "Creator Director",
			imgSrc: member2Avatar,
		},
		{
			name: "Bernardo Ng",
			role: "Full Stack Developer",
			imgSrc: member3Avatar,
		},
	];
}
