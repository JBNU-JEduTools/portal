import { useEffect } from "react"
import Contact from "@/components/home/Contact"
import { ArrowRight } from "lucide-react"

type Member = {
  name: string
  nameEn: string
  department?: string
  interest?: string
  email: string
  image: string
}

type AlumniMember = {
  name: string
  nameEn: string
  studentId: string
  currentAffiliation?: string
}

const professor: Member = {
  name: "박현찬",
  nameEn: "Hyunchan Park",
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
  { name: "승연", nameEn: "Nguyen Thi Ngoc Duyen", department: "컴퓨터인공지능학부", email: "dn16032004@jbnu.ac.kr", image: "/img/members/seungyeon.jpg" },
  { name: "홍채운", nameEn: "Hong Chae Un", department: "컴퓨터공학부", email: "hcw88928@jbnu.ac.kr", image: "/img/members/hong-chaeun.jpg" },
]

const alumni: AlumniMember[] = [
  { name: "김진오", nameEn: "Kim Jinoh", studentId: "201614822" },
  { name: "장준희", nameEn: "Jang Junhee", studentId: "2014", currentAffiliation: "현대자동차" },
  { name: "윤준하", nameEn: "Yoon Junha", studentId: "2013", currentAffiliation: "삼성전자" },
  { name: "이창헌", nameEn: "Lee Changheon", studentId: "2017", currentAffiliation: "NEXON GAMES" },
  { name: "최지민", nameEn: "Choi Jimin", studentId: "2014", currentAffiliation: "EBS" },
  { name: "추승지", nameEn: "Chu Seungji", studentId: "201414301", currentAffiliation: "한국투자증권" },
  { name: "김형중", nameEn: "Kim Hyeongjung", studentId: "201414222", currentAffiliation: "하나금융TI" },
  { name: "서예진", nameEn: "Seo Yejin", studentId: "201811235", currentAffiliation: "DB Inc (동부아이엔씨)" },
  { name: "장윤정", nameEn: "Jang Yunjung", studentId: "201812179", currentAffiliation: "메가존클라우드" },
  { name: "김요셉", nameEn: "Kim Yosep", studentId: "201821688" },
  { name: "고영훈", nameEn: "Go Younghun", studentId: "201711032", currentAffiliation: "고려대학교 대학원" },
  { name: "신승원", nameEn: "Shin Seungwon", studentId: "201716403", currentAffiliation: "삼성SDS" },
  { name: "권기남", nameEn: "Kwon Ginam", studentId: "201716357", currentAffiliation: "삼성전자" },
  { name: "이명규", nameEn: "Lee Myeonggyu", studentId: "201716422", currentAffiliation: "금융결제원" },
  { name: "김민지", nameEn: "Kim Minji", studentId: "201911773" },
  { name: "정지호", nameEn: "Jung Jiho", studentId: "201818784", currentAffiliation: "우아한테크코스(배민 부트캠프)" },
  { name: "남윤수", nameEn: "Nam YounSu", studentId: "201850686", currentAffiliation: "고려대학교 대학원" },
  { name: "김규호", nameEn: "Kim Gyuho", studentId: "201921967", currentAffiliation: "SK Inc. AX" },
  { name: "진순헌", nameEn: "Jin SoonHeon", studentId: "202018023", currentAffiliation: "신용보증기금" },
  { name: "김담은", nameEn: "Kim DamEun", studentId: "202219352", currentAffiliation: "하이비전시스템" },
  { name: "박은송", nameEn: "Park EunSong", studentId: "202219386", currentAffiliation: "신한펀드파트너스" },
  { name: "허민", nameEn: "Heo Min", studentId: "202219460", currentAffiliation: "서강대학교 대학원" },
  { name: "허완", nameEn: "Heo Yan", studentId: "202018416", currentAffiliation: "저축은행중앙회" },
  { name: "김진석", nameEn: "Kim JinSeok", studentId: "202012180", currentAffiliation: "한전KDN" },
  { name: "김은혜", nameEn: "Kim EunHye", studentId: "202212112", currentAffiliation: "SSAFY" },
]

const alumniByEntryYear = alumni.reduce<Record<string, AlumniMember[]>>((groups, person) => {
  const entryYear = person.studentId.slice(0, 4)
  groups[entryYear] ??= []
  groups[entryYear].push(person)
  return groups
}, {})

const alumniEntryYears = Object.keys(alumniByEntryYear).sort((a, b) => Number(b) - Number(a))

const affiliationUrls: Record<string, string> = {
  "현대자동차": "https://www.hyundai.com/kr/ko/e",
  "한국투자증권": "https://securities.koreainvestment.com/main/Main.jsp",
  "하나금융TI": "https://www.hanati.co.kr/kor/main.do?type=kor",
  "DB Inc (동부아이엔씨)": "https://www.dbinc.co.kr",
  "메가존클라우드": "https://megazone.com",
  "고려대학교 대학원": "https://graduate.korea.ac.kr",
  "삼성SDS": "https://www.samsungsds.com/kr",
  "삼성전자": "https://www.samsung.com/sec",
  "NEXON GAMES": "https://www.nexongames.co.kr",
  "EBS": "https://www.ebs.co.kr",
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
          draggable={false}
          alt={`${member.name} 프로필 사진`}
          loading={featured ? "eager" : "lazy"}
          decoding="async"
          className={featured
            ? "aspect-[3/4] h-auto w-full object-cover object-top sm:h-full sm:aspect-auto"
            : "h-full min-h-[183px] w-full object-cover object-top"}
        />
      </div>
      <div className={featured ? "self-center p-6 sm:px-6 sm:py-4" : "min-w-0 self-center px-[18px] py-4"}>
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
        <div className="relative mx-auto w-full max-w-screen-xl px-6 text-center sm:px-8 lg:px-12">
          <p className="mb-3 text-[13px] font-extrabold uppercase tracking-[0.12em] text-[#1c5492]">JEduTools · Development Team</p>
          <h1 className="text-[40px] font-extrabold leading-[1.12] tracking-[-0.055em] text-[#101828] sm:text-[52px]">구성원</h1>
          <a
            href="https://litmus.jedutools.io/about/#:~:text=ver2"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#d0d5dd] bg-white px-4 py-2 text-[13px] font-extrabold tracking-[0.02em] text-[#1c5492] transition-colors hover:bg-[#f8fafc] focus-visible:rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1c5492] sm:absolute sm:bottom-0 sm:right-8 sm:mt-0 lg:right-12"
          >
            LITMUS TEAM
            <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={2} />
          </a>
        </div>
      </section>

      <div className="mx-auto w-full max-w-screen-xl px-4 py-[58px] sm:px-6 sm:pt-[76px] sm:pb-10 lg:px-8">
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
          <div className="space-y-10">
            {alumniEntryYears.map((entryYear) => (
              <section key={entryYear} aria-labelledby={`alumni-${entryYear}-heading`}>
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-5 w-1 shrink-0 rounded-full bg-[#1c5492]" aria-hidden="true" />
                  <h3 id={`alumni-${entryYear}-heading`} className="text-lg font-bold text-[#1c5492]">{entryYear}학번</h3>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {alumniByEntryYear[entryYear].map((person) => (
                    <article key={person.name} className="min-h-[108px] rounded-[10px] bg-[#f8fafc] px-4 py-4">
                      <h4 className="flex flex-wrap items-baseline gap-[7px] text-xl font-bold leading-[1.4] text-[#101828]">
                        {person.name}<small className="text-base font-medium text-[#667085]">{person.nameEn}</small>
                      </h4>
                      <AlumniAffiliation person={person} />
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <p className="mt-[22px] border-l-2 border-[#d0d5dd] py-0.5 pl-3.5 text-[13px] leading-[1.6] text-[#667085]">졸업생의 현재 소식은 확인되는 대로 업데이트됩니다.</p>
        </section>
      </div>
      <Contact />
    </main>
  )
}
