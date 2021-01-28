<template>
	<view class="content">
		<view class="popup">
			<view class="popup-header">
				设置
			</view>
			<view>
				<view class="uni-form-item ">
					<button type="default" @click="navTo('../clinic/clinic')">门诊(横屏)</button>
				</view>
				<!-- <view class="uni-form-item ">
					<button type="default" @click="navTo('../clinic/clinicPortrait')">麻醉门诊(竖屏)</button>
				</view> -->
				<view class="uni-form-item ">
					<button type="default" @click="navTo('../check/check')">检查间</button>
				</view>
				<view class="uni-form-item ">
					<button type="default" @click="navTo('../ready/ready')">准备间</button>
				</view>
				<view class="uni-form-item ">
					<button type="default" @click="navTo('../ultrasonic/ultrasonic')">超声科</button>
				</view>
				<view class="uni-form-item ">
					<button type="default" @click="navTo('../ultrasonic/ultrasonicSmall')">超声科(小屏)</button>
				</view>
				<view class="uni-form-item ">
					<button type="default" @click="navTo('../famous/famous')">老专家</button>
				</view>
				<view class="uni-form-item ">
					<button type="default" @click="navTo('../famous/famousSmall')">老专家(小屏)</button>
				</view>
				<view class="uni-form-item ">
					<button type="default" @click="navTo('../journal/journal')">工作日志</button>
				</view>
				<view class="uni-form-item ">
					<button type="default" @click="navTo('../skin/skin')">皮肤科</button>
				</view>
				<!-- <view>
					{{failText}}
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			pageSet:'',
			failText:'测试',
			pageSetBoolean:true,
		};
	},
	onShow() {
		this.pageSet = uni.getStorageSync('pageSet')||'';
		this.pageSetBoolean = uni.getStorageSync('pageSetBoolean');
		console.log(uni.getStorageSync('pageSetBoolean'));
		if(this.pageSet && this.pageSetBoolean){
			this.navTo(this.pageSet);
		}
	},
	methods: {
		navTo(data){
			uni.setStorageSync('pageSetBoolean',true);
			uni.redirectTo({
				url: data,
				success: res => {
					console.log('redirectTo');
					uni.setStorageSync('pageSet',data);
				},
				fail: (res) => {
					this.failTextr = JSON.stringify(res);
					console.log(this.failTextr);
				},
				complete: () => {}
			});
		}
	}
};
</script>

<style>
.content{
	background-color: rgba(0, 0, 0, 0.4);
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
page {
	height: 100%;
}
.popup-btn{
		font-size: 30px;
		color: #fff;
		padding-left: 40px;
		padding-right: 40px;
		background-color: rgb(68,114,196);
		margin-left: 40px;
		margin-right: 40px;
	}
	.popup{
		background-color: #fff;
		width: 600px;
		min-width: 500px;
		font-size: 40px;
		z-index: 100;
		max-height: 85%;
		overflow: scroll;
	}
	.popup-header{
		background-color: rgb(68,114,196);
		text-align: center;
		padding: 20px 0 ;
	}
	.uni-form-item{
		display: flex;
		align-items: center;
		padding: 40px;
		justify-content: center;
	}
	.uni-form-item button{
		font-size: 40px;
		background-color: rgb(68,114,196);
		color: #fff;
		width: 60%;
	}
</style>
