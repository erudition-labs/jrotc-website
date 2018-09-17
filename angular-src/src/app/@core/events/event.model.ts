export interface Event {
	_id							?: string;
	name 						: string;
	isVerificationRequired 		: boolean;
	isVerified 					: boolean;
	isSignupRequired 			: boolean;
	summary						: string;
	date 						: any[];
	OIC 						: any[];
	signedUp 					: any[];
	pending						: any[];
	additionalDetails			: string;
	author						: any;
}
