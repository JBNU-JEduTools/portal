import { useEffect } from "react"

type Member = {
  name: string
  nameEn: string
  role?: string
  department?: string
  interest?: string
  email: string
  image: string
}

type AlumniMember = {
  name: string
  nameEn: string
  currentAffiliation?: string
}

const professor: Member = {
  name: "박현찬",
  nameEn: "Hyunchan Park",
  role: "교수",
  interest: "운영체제, 가상화 시스템",
  email: "hyunchan.park@jbnu.ac.kr",
  image: "/img/members/park-hyunchan.jpg",
}

const students: Member[] = [
  { name: "김경식", nameEn: "Kim Gyeongsik", department: "소프트웨어공학과", email: "gyungdal@jbnu.ac.kr", image: "/img/members/kim-gyeongsik.jpg" },
  { name: "송정규", nameEn: "Song Junggyu", department: "컴퓨터공학부", email: "songg9572@jbnu.ac.kr", image: "/img/members/song-junggyu.jpg" },
  { name: "이준수", nameEn: "Lee Junsu", department: "컴퓨터공학부", email: "ljs21008@jbnu.ac.kr", image: "/img/members/lee-junsu.png" },
  { name: "서종호", nameEn: "Seo JongHo", department: "컴퓨터인공지능학부", email: "whdgh9173@jbnu.ac.kr", image: "/img/members/seo-jongho.jpg" },
  { name: "정보승", nameEn: "Jung Boseung", department: "컴퓨터인공지능학부", email: "202524409@jbnu.ac.kr", image: "/img/members/jung-boseung.jpg" },
  { name: "길민준", nameEn: "Gil Minjun", department: "컴퓨터공학부", email: "soet02@jbnu.ac.kr", image: "/img/members/gil-minjun.jpg" },
  { name: "김민성", nameEn: "Kim Minsung", department: "소프트웨어공학과", email: "funniest@jbnu.ac.kr", image: "/img/members/kim-minsung.jpg" },
  { name: "승연", nameEn: "Nguyen Thi Ngoc Duyen", department: "컴퓨터인공지능학과", email: "dn16032004@jbnu.ac.kr", image: "/img/members/seungyeon.jpg" },
  { name: "홍채운", nameEn: "Hong Chae Un", department: "컴퓨터공학부", email: "hcw88928@jbnu.ac.kr", image: "/img/members/hong-chaeun.jpg" },
]

const alumni: AlumniMember[] = [
  { name: "김진오", nameEn: "Kim Jinoh" },
  { name: "추승지", nameEn: "Chu Seungji", currentAffiliation: "한국투자증권" },
  { name: "김형중", nameEn: "Kim Hyeongjung", currentAffiliation: "하나금융TI" },
  { name: "서예진", nameEn: "Seo Yejin", currentAffiliation: "DB Inc (동부아이엔씨)" },
  { name: "장윤정", nameEn: "Jang Yunjung", currentAffiliation: "메가존클라우드" },
  { name: "김요셉", nameEn: "Kim Yosep" },
  { name: "고영훈", nameEn: "Go Younghun", currentAffiliation: "고려대학교 대학원" },
  { name: "신승원", nameEn: "Shin Seungwon", currentAffiliation: "삼성SDS" },
  { name: "권기남", nameEn: "Kwon Ginam", currentAffiliation: "삼성전자" },
  { name: "이명규", nameEn: "Lee Myeonggyu", currentAffiliation: "금융결제원" },
  { name: "김민지", nameEn: "Kim Minji" },
  { name: "정지호", nameEn: "Jung Jiho", currentAffiliation: "우아한테크코스(배민 부트캠프)" },
  { name: "남윤수", nameEn: "Nam YounSu", currentAffiliation: "고려대학교 대학원" },
  { name: "김규호", nameEn: "Kim Gyuho", currentAffiliation: "SK Inc. AX" },
  { name: "진순헌", nameEn: "Jin SoonHeon", currentAffiliation: "신용보증기금" },
  { name: "김담은", nameEn: "Kim DamEun", currentAffiliation: "하이비전시스템" },
  { name: "박은송", nameEn: "Park EunSong", currentAffiliation: "신한펀드파트너스" },
  { name: "허민", nameEn: "Heo Min", currentAffiliation: "서강대학교 대학원" },
  { name: "허완", nameEn: "Heo Yan", currentAffiliation: "저축은행중앙회" },
  { name: "김진석", nameEn: "Kim JinSeok", currentAffiliation: "한전KDN" },
  { name: "김은혜", nameEn: "Kim EunHye", currentAffiliation: "SSAFY" },
]

const affiliationUrls: Record<string, string> = {
  "한국투자증권": "https://securities.koreainvestment.com/main/Main.jsp",
  "하나금융TI": "https://www.hanati.co.kr/kor/main.do?type=kor",
  "DB Inc (동부아이엔씨)": "https://www.dbinc.co.kr",
  "메가존클라우드": "https://megazone.com",
  "고려대학교 대학원": "https://graduate.korea.ac.kr",
  "삼성SDS": "https://www.samsungsds.com/kr",
  "삼성전자": "https://www.samsung.com/sec",
  "금융결제원": "https://community.kftc.or.kr/kftc/main/EgovkftcMain.do",
  "우아한테크코스(배민 부트캠프)": "https://www.woowacourse.io",
  "SK Inc. AX": "https://www.skax.co.kr",
  "신용보증기금": "https://www.kodit.co.kr",
  "하이비전시스템": "https://www.hyvision.co.kr",
  "신한펀드파트너스": "https://www.shinhanfundpartners.com",
  "서강대학교 대학원": "https://gradsch.sogang.ac.kr",
  "저축은행중앙회": "https://www.fsb.or.kr",
  "한전KDN": "https://www.kdn.com",
  "SSAFY": "https://www.ssafy.com",
}

function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <header className="mb-6 border-b border-[#d0d5dd] pb-5 sm:mb-[30px]">
      <div>
        <h2 className="text-2xl font-bold leading-[1.3] tracking-[-0.035em] text-[#101828] sm:text-[28px]">{title}</h2>
        <p className="mt-2 text-[15px] leading-[1.65] text-[#667085] [word-break:keep-all]">{description}</p>
      </div>
    </header>
  )
}

function ProfileCard({ member, featured = false }: { member: Member; featured?: boolean }) {
  return (
    <article className={featured
      ? "grid max-w-[720px] overflow-hidden rounded-[10px] border border-[#e4e7ec] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:h-[202px] sm:grid-cols-[150px_minmax(0,1fr)]"
      : "grid min-w-0 grid-cols-[96px_minmax(0,1fr)] overflow-hidden rounded-[10px] border border-[#e4e7ec] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)] sm:grid-cols-[104px_minmax(0,1fr)] lg:h-[183px] lg:grid-cols-[136px_minmax(0,1fr)]"}
    >
      <div className={featured
        ? "w-[180px] overflow-hidden border-r border-[#e4e7ec] bg-[#f8fafc] sm:h-full sm:w-[150px]"
        : "h-full w-24 overflow-hidden border-r border-[#e4e7ec] bg-[#f8fafc] sm:w-[104px] lg:w-[136px]"}
      >
        <img
          src={member.image}
          alt={`${member.name} 프로필 사진`}
          loading={featured ? "eager" : "lazy"}
          decoding="async"
          className={featured
            ? "aspect-[3/4] h-auto w-full object-cover object-top sm:h-full sm:aspect-auto"
            : "h-full min-h-[183px] w-full object-cover object-top"}
        />
      </div>
      <div className={featured ? "self-center p-6 sm:px-6 sm:py-4" : "min-w-0 px-[18px] py-4"}>
        <p className="mb-1.5 text-xs font-bold tracking-[0.08em] text-[#1c5492]">{member.role || "학부 연구생"}</p>
        <h3 className="flex flex-col gap-[3px] leading-[1.3] text-[#101828]">
          <span className="text-[21px] font-bold tracking-[-0.025em]">{member.name}</span>
          <small className="text-sm font-medium text-[#667085]">{member.nameEn}</small>
        </h3>
        <dl className="mt-3.5 grid grid-cols-[68px_minmax(0,1fr)] gap-x-3 gap-y-1.5 border-t border-[#eaecf0] pt-[13px] text-sm leading-[1.45]">
          {member.department && <><dt className="font-semibold text-[#98a2b3]">소속 학과</dt><dd className="min-w-0 text-[#475467]">{member.department}</dd></>}
          {member.interest && <><dt className="font-semibold text-[#98a2b3]">연구 분야</dt><dd className="min-w-0 text-[#475467]">{member.interest}</dd></>}
          <dt className="font-semibold text-[#98a2b3]">이메일</dt>
          <dd className="min-w-0 break-all"><a href={`mailto:${member.email}`} className="font-semibold text-[#034287] hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c5492]">{member.email}</a></dd>
        </dl>
      </div>
    </article>
  )
}

function AlumniAffiliation({ person }: { person: AlumniMember }) {
  if (!person.currentAffiliation) {
    return <p className="mt-2 flex items-center gap-[7px] text-sm leading-[1.55] text-[#98a2b3] before:h-[5px] before:w-[5px] before:rounded-full before:bg-[#c4cbd4] before:content-['']">근황 업데이트 예정</p>
  }

  const href = affiliationUrls[person.currentAffiliation]
  return (
    <p className="mt-2 text-sm leading-[1.55] text-[#667085]">
      현재 소속:{" "}
      <a href={href} target="_blank" rel="noopener noreferrer" className="font-bold text-[#1c5492] underline decoration-[#8ca9c7] underline-offset-[3px] transition-colors hover:text-[#034287] focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c5492]">
        {person.currentAffiliation}
      </a>
    </p>
  )
}

export default function MembersPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [])

  return (
    <main className="bg-white text-[#1f2937]">
      <section className="border-b border-[#e4e7ec] bg-white py-11 sm:py-14">
        <div className="relative mx-auto w-full max-w-screen-xl px-6 pl-11 sm:px-8 sm:pl-[54px] lg:px-12 lg:pl-[70px] before:absolute before:bottom-1 before:left-6 before:top-1 before:w-[3px] before:rounded-full before:bg-[#1c5492] before:content-[''] sm:before:left-8 lg:before:left-12">
          <p className="mb-3 text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#1c5492]">JEduTools · Development Team</p>
          <h1 className="text-[40px] font-extrabold leading-[1.12] tracking-[-0.055em] text-[#101828] sm:text-[52px]">구성원</h1>
          <p className="mt-[17px] max-w-[650px] text-[15px] font-medium leading-7 text-[#475467] [word-break:keep-all] sm:text-base">운영체제와 가상화 시스템을 연구하며, 교육과 기술을 연결하는 도구를 함께 만들어갑니다.</p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-screen-xl px-4 py-[58px] sm:px-6 sm:py-[76px] lg:px-8 lg:pb-[108px]">
        <section className="mb-[68px] sm:mb-[88px]" aria-labelledby="professor-heading">
          <div id="professor-heading"><SectionHeading title="교수" description="JEduTools 연구와 개발을 이끄는 지도교수입니다." /></div>
          <ProfileCard member={professor} featured />
        </section>

        <section className="mb-[68px] sm:mb-[88px]" aria-labelledby="students-heading">
          <div id="students-heading"><SectionHeading title="학부 연구생" description="JEduTools와 함께 연구하고 개발하는 학부 연구생입니다." /></div>
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">
            {students.map((student) => <ProfileCard key={student.email} member={student} />)}
          </div>
        </section>

        <section aria-labelledby="alumni-heading">
          <div id="alumni-heading"><SectionHeading title="졸업생" description="JEduTools와 함께했던 졸업생들의 현재 소식입니다." /></div>
          <div className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
            {alumni.map((person, index) => (
              <article key={`${person.name}-${index}`} className="grid min-h-[108px] grid-cols-[34px_minmax(0,1fr)] items-center gap-2 border-b border-[#e4e7ec] px-1 py-[22px] sm:grid-cols-[42px_minmax(0,1fr)]">
                <span className="text-xs font-bold tracking-[0.06em] text-[#98a2b3]">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="flex flex-wrap items-baseline gap-[7px] text-xl font-bold leading-[1.4] text-[#101828]">
                    {person.name}<small className="text-base font-medium text-[#667085]">{person.nameEn}</small>
                  </h3>
                  <AlumniAffiliation person={person} />
                </div>
              </article>
            ))}
          </div>
          <p className="mt-[22px] border-l-2 border-[#d0d5dd] py-0.5 pl-3.5 text-[13px] leading-[1.6] text-[#667085]">졸업생의 현재 소식은 확인되는 대로 업데이트됩니다.</p>
        </section>
      </div>
    </main>
  )
}
