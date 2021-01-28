<template>
	<view class="content"  @longpress="open" @click="open">
		<image class="bg" src="/static/famousSmall.png" ></image>
		<view class="info-doctor">
			<view class="doctor-top">
				<image class="doctor-user" :src="data.img" mode=""></image>
				<view class="doctor-basic">
					<view class="doctor-basic-name">{{data.doctorName}}</view>
					<view>{{data.title}}</view>
				</view>
			</view>
			<view class="doctor-bottom">
				<view>
					{{data.info}}
				</view>
				<view v-if="data.time">
					坐诊时间：{{data.time}}
				</view>
			</view>
		</view>
		<view class="info-patient">
			<view class="seeing">
				<view>{{data.seeingNumber}}</view>
				<view class="info-patient-name">{{data.seeingName}}</view>
			</view>
			<view class="waiting">
				<view>{{data.waitingNumber}}</view>
				<view class="info-patient-name">{{data.waitingName}}</view>
			</view>
		</view>
		<popupSet ref="popupSet" @confirm="confirm" @close="close" :dataInit="dataPopup"  :showIType="true" :showScreenNumber="true"></popupSet>
	</view>
</template>

<script>
	import popupSet from '../../components/popup-set/popup-set.vue';
	export default {
		components: { popupSet },
		data() {
			return {
				dateText: {
					year: '',
					month: '',
					date: '',
					day: '',
					time: ''
				},
				title:'麻醉检查室',
				weekday: [],
				data:{
					doctorName:'',
					title:'',
					info:'',
					time:'',
					img:'',
					seeingNumber:'',
					seeingName:'',
					waitingNumber:'',
					waitingName:'',
				},
				cliniqueCode:'',
				iType:'',
				popupShow:false,
				seqNumber:'',
				screenNumber: '',
				playSound:false,
				voiceDataInit:[],
				voiceData:[],
				test:'测试',
				testNubmer:0,
				dataPopup:{
					title:'',
					iType:'',
					screenNumber:'',
					playSound:false,
				},
				reload:false
			}
		},
		onLoad() {
			this.iType = uni.getStorageSync('iType')||'';
			this.screenNumber = uni.getStorageSync('screenNumber') || '';
			if(this.iType){
				this.init();
				this.dataPopup.iType = this.iType;
				this.dataPopup.screenNumber = this.screenNumber;
			}
		},
		methods: {
			
			// 打开设置
			open(){
				this.$refs.popupSet.open();
				this.popupShow = true;
			},
			// 关闭设置
			close(){
				this.popupShow = false;
				if(this.iType){
					this.init();
				}
			},
			//确定设置
			confirm(res){
				this.iType = res.iType;
				this.screenNumber = res.screenNumber;
				this.popupShow = false;
				this.init();
				console.log(this.iType);
			},
			// 初始化数据
			init(){
				if(this.popupShow){
					return false;
				}
				// 测试使用
// 				let res = {data:{"Data":[{"ghhbid":"434144","dept_code":"2149","dept_name":"名医苑","clinique_name":"专家门诊1","clinique_code":"620","tech_title":null,"doctor":"刘建忠","doctor_pic":null,"calling":"刘建忠","calling_seq":"1231","calling_pre_time":null,"waiting":"高权","waiting_seq":"1","waiting_pre_time":null,"am_pm":"下午","status":"坐诊","dqjzbr":"陈兰","dqjzxh":"2"}],
// "ServiceTime":"2020-09-10 11:02:22",
// "Doctor":{"doctorID":null,"doctorName":null,"doctorTitle":"主治医师","doctorPicture":"/photos/李四.jpg","doctorInfo":"福建省名中医，擅长男性性功能障碍,福建省名中医，擅长男性性功能障碍","doctorWorkTime":"997"}}};
				uni.request({
					url: 'http://129.1.20.21:8019/Queue/mmy_Get_Queue',
					data: {
						dept_code: this.iType,
						Clinique_code: this.screenNumber,
					},
					success: res => {
						let datas = res.data.Data;
						if(res.data.reload=='true' && this.reload!=res.data.reload){
							this.$tui.webView.postMessage({
								data: {
									reload:res.data.reload
								}
							})
						}
						this.reload = res.data.reload;
						let doctor = res.data.Doctor;
						setTimeout(() => {
							this.init();
						}, 5000);
						if(datas.length==0){
							return
						}
						this.data = {
							doctorName:datas[0].doctor||'',
							title:doctor.doctorTitle||'',
							info:doctor.doctorInfo||'',
							time:doctor.doctorWorkTime||'',
							img:doctor.doctorPicture?('http://129.1.20.21:8019'+doctor.doctorPicture):'../../static/user.png',
							seeingNumber:datas[0].calling_seq,
							seeingName:datas[0].calling,
							waitingNumber:datas[0].waiting_seq,
							waitingName:datas[0].waiting,
						}
					},
					fail: res => {
						uni.showToast({
							title: '请求失败',
							icon: 'none'
						});
						setTimeout(() => {
							this.init();
						}, 5000);
					}
				});
			},
		}
	}
</script>

<style>
.pr-15{
	padding-right: 15px;
}
.pl-15{
	padding-left: 15px;
}
page {
	height: 100%;
}



.header{
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	height: 118px;
}
.room{
	width: 735px;
	margin-left: 50px;
}
.content {
	position: relative;
	height: 100%;
}

.bg {
	position: absolute;
	width: 1080px;
	height: 1920px;
	z-index: -1;
}
.header-time {
	display: flex;
	position: absolute;
	justify-content: center;
	right: 45px;
	padding-top: 15px;
	top: 70px;
}

.header-time view {
	font-size: 38px;
	color: #000;
	letter-spacing:5px;
}

.mt-39{
	margin-top: 39px;
}
.mt-15{
	margin-top: 15px;
}
.mt-20{
	margin-top: 20px;
}

.name{
	width: 735px;
	margin-left: 143px;
}
.info-patient{
	padding-top: 76px;
}
.info-patient .info-patient-name{
	padding-left: 220px;
}
.info-patient view {
	font-size: 90px;
	color: #000;
	display: flex;
	align-items: center;
	justify-content: center;
	white-space: nowrap;
	overflow: hidden;
	height: 300px;
	text-overflow: ellipsis;
	font-weight: bold;
}

.doctor-user{
	height: 290px;
	width: 230px;
	background-color: #FFFFFF;
	background-image: url(../../static/user.png);
	background-repeat: no-repeat;
	background-size: 230px 290px;
}
.info-doctor{
    padding-top: 309px;
    height: 633px;
    width: 969px;
    margin: auto;
}
.doctor-top{
	display: flex;
	padding: 40px 60px 20px 60px;
}
.doctor-basic{
	padding-left: 30px;
	width: 569px;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	font-size: 54px;
}
.doctor-basic view{
	text-align: center;
	font-weight: bold;
	
}
.doctor-basic-name{
	font-size: 90px;
	letter-spacing: 7px;
	padding-bottom: 10px;
}
.doctor-bottom {
	padding: 0 20px;
	letter-spacing: 2px;
}
.doctor-bottom view{
	font-size: 43px;
	text-indent: 2em;
}
</style>
