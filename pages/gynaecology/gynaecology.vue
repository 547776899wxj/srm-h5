<template>
	<view>
		<view class="content"  @longpress="open" @click="open">
			<image class="bg" src="/static/fuke_bg.png" ></image>
			<view v-if="data">
				<view class="header">
					{{title}}
				</view>
				<view class="doctor">
					<view class="doctor-top">
						<view class="doctor-img">
							<image class="image" v-show="doctor.doctorPicture && doctor.doctorName" :src="doctor.doctorPicture" mode=""></image>
						</view>
						<view class="title">
							<view class="doctor-name">{{doctor.doctorName}}</view>
							<view class="doctor-title">{{doctor.doctorTitle}}</view>
						</view>
					</view>
					<view class="doctor-info" >
						<view style="height: 160px;overflow: hidden;" v-if="doctor.doctorInfo">擅长：{{doctor.doctorInfo}}</view>
						<view style="height: 90px;overflow: hidden;"  v-if="doctor.doctorScheduling">坐诊时间：{{doctor.doctorScheduling}}</view>
					</view>
				</view>
				<view class="data">
					<view class="data-item">
						<text style="margin-right: 50px;" v-show="data.callingSeq">{{data.callingSeq}}号</text>
						<text>{{data.calling}}</text>
					</view>
					<view class="data-item">
						<text style="margin-right: 50px;"  v-show="data.waitingSeq">{{data.waitingSeq}}号</text>
						<text>{{data.waiting}}</text>
					</view>
				</view>
			</view>
		</view>
		<popupSet ref="popupSet" @confirm="confirm" iTypeText="诊室" @close="close" :dataInit="dataPopup"></popupSet>
	</view>
</template>

<script>
	import popupSet from '../../components/popup-set/popup-set.vue';
	export default {
		components: { popupSet },
		data() {
			return {
				iType:'',
				title:'',
				screenNumber:'',
				popupShow:false,
				dateText: {
					year: '',
					month: '',
					date: '',
					day: '',
					time: ''
				},
				doctor:{
				},
				dataPopup:{
					title:'',
					iType:'',
					screenNumber:'',
					playSound:false,
				},
				data:{},
				voiceData:[],
				voiceDataInit:[],
				voicePlayTiems:3,
				voicePlayNumber:0,
				testNumber:0,
			};
		},
		onLoad() {
			this.init();
		},
		methods:{
			// 打开设置
			open(){
				this.$refs.popupSet.open();
				this.popupShow = true;
			},
			// 关闭设置
			close(){
				this.popupShow = false;
				
			},
			//确定设置
			confirm(res) {
				this.iType = res.iType;
				this.screenNumber = res.screenNumber;
				this.popupShow = false;
				
			},
			init(){
				// let res = {data:{queueTitle:'妇科疑难病症，微创手术专病门诊',"doctor": {"doctorScheduling":'星期一星期一星期一星期一星期一星期',"doctorId": 1,"doctorName": '测试',"doctorTitle": '宇宙第一',"doctorPicture": '../../static/test.jpeg',"doctorInfo": '士大夫哈时代峰峻暗红士大夫哈时代峰'},"reload": false,"Data": {"deptCode": "2142","deptName": "心血管科","cliniqueName": "212诊室","cliniqueCode": "510","doctor": "刘建忠","calling": '就诊中',"callingSeq": null,"waiting": "陈六金","waitingSeq": "11","checking": "林永贞","checkingSeq": "高72"},"ServerTime": "2021-04-06 15:01:48"}}
				// 测试----------------------------------------------------------------------------------------------------------------------------------------
				uni.request({	
					url: 'http://129.1.20.21:8019/Queue/getSmallQueue',
					method: 'POST',
					success: res => { 
						try{
							if(res.data.reload=='true' || res.data.reload==true){
								location.reload();
								return;
							}
							this.title = res.data.queueTitle || '';
							this.doctor = res.data.doctor;
							let data = res.data.Data;
							if(data.calling){
								data.calling = (data.calling == '就诊中' ? data.calling : this.$util.hideName(data.calling)) || '';
							}else{
								data.calling = this.date.calling;
							}
							data.waiting = data.waiting?this.$util.hideName(data.waiting):'';
							console.log(data);
							this.data = data;
							setTimeout(() => {
								this.init();
							}, 6000);
						}catch(e){
							console.error(e);
							setTimeout(() => {
								this.init();
							}, 6000);
						}
						
					},
					fail: (err) => {
						setTimeout(() => {
							this.init();
						}, 6000);
					},
				});
			},
		}
	}
</script>

<style lang="scss">
.data{
	.data-item{
		margin-top: 100px;
		font-size: 70px;
		height: 170px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
.doctor{
	height: 530px;
	overflow: hidden;
	padding: 20px 60px;
	.doctor-top{
		display: flex;
		.doctor-img{
			width: 196px;
			height: 284px;
			margin-left: 32px;
			.image{
				width: 196px;
				height: 284px;
			}
		}
		.title{
			display: flex;
			align-items: center;
			flex-direction: column;
			width: 414px;
		}
		.doctor-name{
			margin-top: 40px;
			margin-bottom: 30px;
			font-size: 75px;
		}
		.doctor-title{
			font-size: 50px;
		}
		
	}
	.doctor-info{
		text-indent: 50px;
		font-size: 28px;
		letter-spacing: 3px;
		line-height: 1.5;
		margin-top: 15px;
	}
}
.content{
	width: 768px;
	height: 1366px;
	font-family: KaiTi;
	font-weight: bold;
}
.pr-30{
	padding-right: 30px;
}
.bg {
	width: 768px;
	height: 1366px;
	position: absolute;
	z-index: -1;
}
.header{
	text-align: center;
    color: #fbf803;
    font-size: 70px;
    height: 185px;
	font-weight: bold;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
